import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { urlProvider } from './http.module';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  const clientProvider = {
    provide: 'client',
    useValue: {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService, ConfigService, urlProvider, clientProvider],
    }).compile();

    service = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data', async () => {
    jest.spyOn(service, 'handleHttpCall').mockImplementation(
      async () =>
        await {
          data: {},
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
        },
    );
    expect(
      await service.handleHttpCall({
        channel: 'genral',
        botbuilder: () => [],
        data: 'response',
      }),
    ).toHaveProperty('status', 200);
  });
});
