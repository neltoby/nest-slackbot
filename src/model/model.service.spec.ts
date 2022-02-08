import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { ModelService } from './model.service';
import { UserResponse } from './schemas/user-resposnse.schema';

let mongod: MongoMemoryServer;

const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });
const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};

describe('ModelService', () => {
  let service: ModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'UserResponse', schema: UserResponse },
        ]),
      ],
      providers: [ModelService],
    }).compile();

    service = module.get<ModelService>(ModelService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('service.insertResponse to be name', async () => {
    const val = await service.insertResponse({
      userId: 'tye',
      name: 'color',
      feeling: 'Well',
      channel: 'general',
      hobbies: ['Swimming'],
    });
    expect(val).toHaveProperty('_id');
    expect(val).toHaveProperty('response');
    expect(val.response[0]).toHaveProperty('_id');
    expect(val).toHaveProperty('slack_user_name', 'color');
  });
});
