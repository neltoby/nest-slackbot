import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(5500),
  SLACK_TOKEN: Joi.string().required(),
  CONNECTION_URL: Joi.string().required(),
});
