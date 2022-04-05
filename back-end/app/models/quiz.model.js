const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
  repetition: Joi.string().required(),
  nbRepetition: Joi.string().required(),
})
