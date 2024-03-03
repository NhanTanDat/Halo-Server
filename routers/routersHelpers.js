const Joi = require('@hapi/joi')

const schemas = {
    authSignInSchema: Joi.object().keys({ 
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    authSignUpSchema: Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
}
  
module.exports = schemas