import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class HttpService {
  constructor(
    @Inject('URL') private URL: string,
    @Inject('client') private client: typeof axios,
    private configService: ConfigService,
  ) {}

  async handleHttpCall({ channel, botbuilder, data }) {
    try {
      return await this.client.post(
        this.URL,
        {
          channel,
          blocks: botbuilder(data),
        },
        {
          headers: {
            authorization: `Bearer ${this.configService.get('slack_token')}`,
          },
        },
      );
    } catch (e) {
      // console.log(e);
    }
  }
}
