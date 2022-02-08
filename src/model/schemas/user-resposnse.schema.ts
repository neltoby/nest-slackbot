import { Document, Schema } from 'mongoose';

export type UserResponseDocument = typeof UserResponse & Document;

export const UserResponse = new Schema({
  slack_user_id: { type: String, required: true, unique: true },
  slack_user_name: { type: String, required: true },
  response: [
    {
      feeling: { type: String, default: '' },
      hobbies: { type: [String], default: [] },
      channel: { type: String, required: true },
      date_time: { type: Date, default: Date.now() },
    },
  ],
});
