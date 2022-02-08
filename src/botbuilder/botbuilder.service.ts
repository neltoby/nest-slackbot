import { Injectable } from '@nestjs/common';
import { MessageOptionsInterface } from 'src/interfaces/message-payload.interface';
import { BuilderDataInterface } from '../interfaces/welcome.interface';

@Injectable()
export class BotbuilderService {
  welcomeBuilder({ question, responses }: BuilderDataInterface): any[] {
    return [
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `${question}`,
          },
        ],
      },
      {
        type: 'actions',
        block_id: 'welcome',
        elements: [
          {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: `${question}`,
            },
            action_id: 'select_1',
            options: responses.reduce((acc, _item) => {
              const newObj = {};
              newObj['text'] = {
                type: 'plain_text',
                text: _item,
              };
              newObj['value'] = _item;
              acc = [...acc, newObj];
              return acc;
            }, []),
          },
        ],
      },
    ];
  }

  messagesBuilder({ question, responses }: BuilderDataInterface): any[] {
    return [
      {
        type: 'section',
        block_id: 'hobbies',
        text: {
          type: 'mrkdwn',
          text: `${question}`,
        },
        accessory: {
          action_id: 'select_hobbies',
          type: 'multi_static_select',
          placeholder: {
            type: 'plain_text',
            text: `${question}`,
          },
          options: responses.reduce(
            (acc: MessageOptionsInterface[], _item: string) => {
              const newObj = {} as MessageOptionsInterface;
              newObj['text'] = {
                type: 'plain_text',
                text: _item,
              };
              newObj['value'] = _item;

              acc = [...acc, newObj];
              return acc;
            },
            [],
          ),
          max_selected_items: 5,
        },
      },
    ];
  }

  appreciationMessageBuilder(response: string) {
    return [
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: response,
          },
        ],
      },
    ];
  }
}
