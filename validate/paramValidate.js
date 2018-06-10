import Joi from 'joi';

export function validateRequestParam(schema) {
  return (req, res, next) => {
    const result = Joi.validate(req.params, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }

    req.value = {};
    req.value.params = result.value;
    next();
  };
}
export const requestParamSchemas = {
  requestParamSchema: Joi.object().keys({
    requestId: Joi.number().integer(),
  }),
};

