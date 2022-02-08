import { Test, TestingModule } from '@nestjs/testing';
import { BotbuilderService } from './botbuilder.service';

import * as data from '../botresponse.json';

describe('BotbuilderService', () => {
  let service: BotbuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotbuilderService],
    }).compile();

    service = module.get<BotbuilderService>(BotbuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('welcomeBuilder should return array', () => {
    const {
      first: { question, responses },
    } = data;
    const blocks = service.welcomeBuilder({ question, responses });
    expect(blocks[0].elements[0].text).toBe(question);
  });

  it('messagesBuilder should return array', () => {
    const {
      second: { question, responses },
    } = data;
    const blocks = service.messagesBuilder({ question, responses });
    expect(blocks[0].text.text).toBe(question);
  });

  it('appreciationMessageBuilder should return array', () => {
    const {
      third: { response },
    } = data;
    const blocks = service.appreciationMessageBuilder(response);
    expect(blocks[0].elements[0].text).toBe(response);
  });
});
