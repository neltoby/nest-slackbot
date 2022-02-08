import * as Joi from 'joi';

// Validate the event to ensure its has no missing property
// and called with only the hello text
export const getBotEventDtoValidator = Joi.object({
  token: Joi.string().required(),
  team_id: Joi.string().required(),
  team_domain: Joi.string().required(),
  channel_id: Joi.string().required(),
  channel_name: Joi.string().required(),
  user_id: Joi.string().required(),
  user_name: Joi.string().required(),
  command: Joi.string().valid('/bot').required(),
  text: Joi.string().valid('hello').required(),
  api_app_id: Joi.string().required(),
  is_enterprise_install: Joi.string().required(),
  response_url: Joi.string().required(),
  trigger_id: Joi.string().required(),
});
