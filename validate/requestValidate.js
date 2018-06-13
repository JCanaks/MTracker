import Joi from 'joi';

export function validateRequest(schema) {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        message: result.error,
      });
    }

    req.value = {};
    req.value.body = result.value;
    next();
  };
}
export const requestSchemas = {
  requestSchema: Joi.object().keys({
    description: Joi.string().min(3).max(100).required(),
    requestType: Joi.string().regex(/^[A-Za-z]{6,11}$/).valid(['Repair', 'Maintenance']).required(),
    requestLevel: Joi.string().regex(/^[A-Za-z]{5,8}$/).valid(['Critical', 'Major', 'Minor']).required(),
  }),
};

