import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3003),
  MONGODB: Joi.required(),
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DEFAULT_LIMIT: Joi.number().default(4),
});
