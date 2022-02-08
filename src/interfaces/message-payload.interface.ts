import { Interface } from 'readline';

export interface MessagePayloadInterface {
  type: string;
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  token: string;
  trigger_id: string;
  channel: {
    id: string;
    name: string;
  };
  actions: any[];
  message: {
    bot_id: string;
    type: string;
    text: string;
    user: string;
    ts: string;
    team: string;
    blocks: any[];
    // {
    //   type: "context", "block_id": "BkUvd", "elements": [{ "type": "mrkdwn", "text": "Welcome. How are you doing?", "verbatim": false }] }, { "type": "actions", "block_id": "welcome", "elements": [{ "type": "static_select", "action_id": "select_1", "placeholder": { "type": "plain_text", "text": "Welcome. How are you doing?", "emoji": true }, "options": [{ "text": { "type": "plain_text", "text": "Doing Well", "emoji": true }, "value": "Doing Well" }, { "text": { "type": "plain_text", "text": "Neutral", "emoji": true }, "value": "Neutral" }, { "text": { "type": "plain_text", "text": "Feeling Lucky", "emoji": true }, "value": "Feeling Lucky" }] }] }]
  };
  //   "state": { "values": { "welcome": { "select_1": { "type": "static_select", "selected_option": { "text": { "type": "plain_text", "text": "Neutral", "emoji": true }, "value": "Neutral" } } } } }, "response_url": "https:\\/\\/hooks.slack.com\\/actions\\/T01MB04A70U\\/3066853822946\\/YUfWqnhh9sw03zv16DZrXTy5", "actions": [{ "type": "static_select", "action_id": "select_1", "block_id": "welcome", "selected_option": { "text": { "type": "plain_text", "text": "Neutral", "emoji": true }, "value": "Neutral" }, "placeholder": { "type": "plain_text", "text": "Welcome. How are you doing?", "emoji": true }, "action_ts": "1644247294.076392" }]
  // }`
}

export interface MessageOptionsInterface {
  text: { type: string; text: string };
  value: string;
}

export interface ReturnedMessagePayloadInterface {
  actions: any[];
  message: {
    blocks: any[];
  };
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  channel: { id: string; name: string };
}

export interface ExtractedMessagePayloadInterface {
  question: string;
  answer: string | string[];
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  channel: { id: string; name: string };
}

export interface PayloadInterface {
  payload: string;
}
