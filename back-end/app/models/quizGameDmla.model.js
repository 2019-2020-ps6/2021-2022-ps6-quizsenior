const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizGameDmla', {
    correctAnswers: Joi.string().required(),
    incorrectAnswers: Joi.string().required(),
    quiz: Joi.string().required(),
})
