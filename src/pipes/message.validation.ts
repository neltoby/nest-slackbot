import * as Joi from 'joi';

// Validate the event to ensure its has no missing property
// and returns only the desired properties
export const getBotMessageValidator = Joi.object({
  type: Joi.string(),
  api_app_id: Joi.string(),
  token: Joi.string().required(),
  container: Joi.object(),
  trigger_id: Joi.string().required(),
  team: Joi.object(),
  enterprise: Joi.any(),
  is_enterprise_install: Joi.boolean(),
  response_url: Joi.string(),
  state: Joi.object(),
  message: Joi.object(),
  user: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    team_id: Joi.string().required(),
  }),
  actions: Joi.array().required(),
  channel: Joi.object({
    name: Joi.string().required(),
    id: Joi.string().required(),
  }),
});
