const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizGame', {
  user: Joi.string(),
  score: Joi.string().required(),
  quiz: Joi.string().required(),
  answers: Joi.string.required(),
})
