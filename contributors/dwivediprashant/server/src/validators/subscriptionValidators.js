const Joi = require('joi');

const createSubscriptionSchema = Joi.object({
  userId: Joi.string(),

  name: Joi.string()
    .trim()
    .min(1)
    .required(),

  amount: Joi.number()
    .positive()
    .required(),

  billingCycle: Joi.string()
    .valid('monthly', 'yearly')
    .required(),

  renewalDate: Joi.date()
    .iso()
    .required(),

  isTrial: Joi.boolean()
    .optional(),

  source: Joi.string()
    .valid('manual', 'email')
    .optional()
});

module.exports = {
  createSubscriptionSchema
};
