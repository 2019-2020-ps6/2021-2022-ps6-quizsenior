const { QuizDmla } = require('../../models')
const { filterQuestionsFromQuizz } = require('./questionsDmla/manager')
const { filterAnswersFromQuestion } = require('./questionsDmla/answersDmla/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questionsDmla and answersDmla from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
    const quiz = QuizDmla.getById(quizId)
    const questions = filterQuestionsFromQuizz(quiz.id)
    const questionWithAnswers = questions.map((question) =>  {
        const answers = filterAnswersFromQuestion(question.id)
        return { ...question, answers: answers }
    })
    return { ...quiz, questions: questionWithAnswers }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questionsDmla and answersDmla from the database to build entire quizzes.
 */
const buildQuizzes = () => {
    const quizzes = QuizDmla.get()
    return quizzes.map((quiz) => buildQuizz(quiz.id))
}

module.exports = {
    buildQuizz,
    buildQuizzes
}
