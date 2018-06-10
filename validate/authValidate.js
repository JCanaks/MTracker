import Joi from 'joi';

export function validateSignup(schema) {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }

    req.value = {};
    req.value.body = result.value;
    next();
  };
}
export const schemas = {
  signupSchema: Joi.object().keys({
    userFullname: Joi.string().regex(/^[A-Za-z\s]{3,40}$/).required(),
    userPassword: Joi.string().regex(/^[a-zA-Z0-9#*/_@^\n]{8,12}$/).required(),
    department: Joi.string().regex(/^[A-Za-z\s]{3,40}$/).valid(['Marketing', 'Sales', 'Technology', 'Human Resource']).required(),
    userEmail: Joi.string().email().required(),
    userPhonenumber: Joi.string().regex(/^\+234+[0-9]{10,10}$/).required(),
  }),
};
