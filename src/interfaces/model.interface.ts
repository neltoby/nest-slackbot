export interface InsertResponseInterface {
  userId: string;
  channel: string;
  name: string;
  feeling: string;
  hobbies: string[];
}

export interface FindResponseData {
  slackUserId: string;
  channel?: string;
}
