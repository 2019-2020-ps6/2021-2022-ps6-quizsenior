const mongoose = require('mongoose');

const quizGameAnswersSchema = mongoose.Schema({
    time: {type: String, required: true},

    quizGameId: {type: String, required: true},
    questionId: {type: String, required: true},
    quizGameId: {type: String, required: true},
});

quizGameAnswersSchema.set('versionKey', false);

module.exports = mongoose.model('quizGameAnswers', quizGameAnswersSchema);