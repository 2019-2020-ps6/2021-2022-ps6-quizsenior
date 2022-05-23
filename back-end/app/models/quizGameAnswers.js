const mongoose = require('mongoose');
const QuestionALZ = require('../models/ALZ/questionALZ');
const AnswerALZ = require('../models/ALZ/answerALZ');

const quizGameAnswersSchema = mongoose.Schema({
    time: {type: String, required: true},

    quizGameId: {type: String, required: true},
    questionRep: {type: String, required: true},
    answerRep: {type: String, required: true},
});

quizGameAnswersSchema.set('versionKey', false);

module.exports = mongoose.model('quizGameAnswers', quizGameAnswersSchema);