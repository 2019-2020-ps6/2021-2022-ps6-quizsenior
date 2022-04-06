
const { QuizGameDmla } = require('../../models')


/**
 * Function buildQuizz.
 * This function aggregates the questionsDmla and answersDmla from the database to build a quizz with all the data needed by the clients.
 * @param quizGameId
 */
const buildQuizGameDmla = (quizGameDmlaId) => {
    const quizGameDmla = QuizGameDmla.getById(quizGameDmlaId)
    return { ...quizGameDmla }
}

const buildQuizGamesDmla = () => {
    const quizGamesDmla = QuizGameDmla.get()
    return quizGamesdmla.map((quizGameDmla) => buildQuizGameDmla(quizGameDmla.id))
}

/**
 * Function buildQuizzes.
 * This function aggregates the questionsDmla and answersDmla from the database to build entire quizzes.
 */

module.exports = {
    buildQuizGameDmla,
    buildQuizGamesDmla,
}
