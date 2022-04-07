const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('AnswerDmla', {
  // type: Joi.string(),
  value: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
  questionId: Joi.number(),
  index: Joi.number().required(),
})
