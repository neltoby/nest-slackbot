import { Test, TestingModule } from '@nestjs/testing';

import * as data from './response.json';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  const mockFxn = jest.fn((payload) => ({
    success: true,
  }));

  const appServiceProvider = {
    provide: AppService,
    useFactory: () => ({
      handleEventPayload: mockFxn,
      handleMessagePayload: mockFxn,
      handleAprreciationMessage: mockFxn,
      generalHandler: mockFxn,
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [appServiceProvider],
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('generalHandler should have called', async () => {
      appController.handleChallengeMessages(data);
      expect(appService.generalHandler).toHaveBeenCalled();
    });
  });
});
