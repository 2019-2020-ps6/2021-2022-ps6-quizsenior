const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizGame', {
  // user: Joi.string(),
  correctAnswers: Joi.string().required(),
  incorrectAnswers: Joi.string().required(),
  quiz: Joi.string().required(),
  nbRepetition: Joi.string().required(),
  answers: Joi.string(),
  // answersDmla: Joi.string,
})
