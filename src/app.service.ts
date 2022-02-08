import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { BotbuilderService } from './botbuilder/botbuilder.service';
import { GetBotEventDto } from './dto/event.dto';
import * as data from './botresponse.json';
import { HttpService } from './http/http.service';
import {
  ExtractedMessagePayloadInterface,
  ReturnedMessagePayloadInterface,
} from './interfaces/message-payload.interface';
import { ModelService } from './model/model.service';
import { errorText } from './constants';

@Injectable()
export class AppService {
  constructor(
    private httpClient: HttpService,
    private botbuilderService: BotbuilderService,
    private saveData: ModelService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async handleEventPayload({ channel_name }: GetBotEventDto): Promise<void> {
    const val = await this.httpClient.handleHttpCall({
      channel: channel_name,
      botbuilder: this.botbuilderService.welcomeBuilder.bind(this),
      data: data.first,
    });
  }

  async handleMessagePayload({
    answer,
    user: { id },
    channel: { name: channel },
  }: ExtractedMessagePayloadInterface): Promise<void> {
    try {
      const { status, data: res } = await this.httpClient.handleHttpCall({
        channel,
        botbuilder: this.botbuilderService.messagesBuilder.bind(this),
        data: data.second,
      });
      if (status === 200 && res) {
        // Cache the users response in memory
        await this.cache.set(
          `${id}${channel}first`,
          JSON.stringify({ question: answer }),
          {
            ttl: 2000,
          },
        );
      }
    } catch (e) {
      throw new HttpException(errorText, 500);
    }
  }

  async handleAprreciationMessage({
    answer,
    user: { id, name },
    channel: { name: channel },
  }: ExtractedMessagePayloadInterface): Promise<void> {
    try {
      const { status, data: res } = await this.httpClient.handleHttpCall({
        channel,
        botbuilder:
          this.botbuilderService.appreciationMessageBuilder.bind(this),
        data: data.third.response,
      });
      if (status === 200 && res) {
        // Retrieve the previous response from memory
        const getCache = await this.cache.get(`${id}${channel}first`);
        if (getCache) {
          const feeling = JSON.parse(getCache as string).question;
          await this.saveData.insertResponse({
            userId: id,
            channel,
            name,
            feeling,
            hobbies: answer as string[],
          });
        } else {
          await this.saveData.insertResponse({
            userId: id,
            channel,
            name,
            feeling: '',
            hobbies: answer as string[],
          });
        }
      }
    } catch (e) {
      throw new HttpException(errorText, 500);
    }
  }

  async generalHandler(payload: ReturnedMessagePayloadInterface) {
    const {
      message: { blocks },
      user,
      actions,
      channel,
    } = payload;
    if (blocks.length > 1) {
      const [block0, block1] = blocks;
      if (block1.block_id === 'welcome')
        return await this.handleMessagePayload({
          question: block0.elements[0].text as string,
          answer: actions[0].selected_option.value as string,
          user,
          channel,
        });
    } else {
      if (blocks[0].block_id === 'hobbies') {
        return await this.handleAprreciationMessage({
          question: blocks[0].text.text as string,
          answer: actions[0].selected_options.reduce((acc, _item) => {
            return [...acc, _item.value];
          }, []),
          user,
          channel,
        });
      }
    }
  }
}
