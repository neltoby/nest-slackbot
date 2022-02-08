import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelService } from './model.service';
import { UserResponse } from './schemas/user-resposnse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserResponse', schema: UserResponse }]),
  ],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
