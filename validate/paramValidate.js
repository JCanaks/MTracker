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
    requestId: Joi.number().integer().required(),
  }),
  filterSchema: Joi.object().keys({
    requestType: Joi.string().regex(/^[A-Za-z]{6,11}$/).valid(['Repair', 'Maintenance', 'none']),
    requestDate: Joi.string().regex(/^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/),
    requestId: Joi.number().integer(),
    requestLevel: Joi.string().regex(/^[A-Za-z]{5,8}$/).valid(['Critical', 'Major', 'Minor', 'none']),
    department: Joi.string().regex(/^[A-Za-z\s]{3,40}$/).valid(['Marketing', 'Sales', 'Technology', 'Human Resource', 'none']),
  }),
};

