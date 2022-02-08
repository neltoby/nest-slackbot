import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserResponseDocument } from './schemas/user-resposnse.schema';
import { InsertResponseInterface } from 'src/interfaces/model.interface';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel('UserResponse')
    private responseModel: Model<UserResponseDocument>,
  ) {}

  async insertResponse({
    userId,
    channel,
    name,
    feeling,
    hobbies,
  }: InsertResponseInterface): Promise<any> {
    try {
      return this.responseModel
        .findOneAndUpdate(
          {
            slack_user_id: userId,
            slack_user_name: name,
          },
          { $push: { response: { feeling, hobbies, channel } } },
          { upsert: true, new: true, lean: true },
        )
        .exec();
    } catch (e) {
      throw new HttpException('Server Error.', 500);
    }
  }
}
