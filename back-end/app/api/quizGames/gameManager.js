
const { QuizGame } = require('../../models')


/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizGameId
 */
const buildQuizGame = (quizGameId) => {
  const quizGame = QuizGame.getById(quizGameId)
  return { ...quizGame }
}

const buildQuizGames = () => {
  const quizGames = QuizGame.get()
  return quizGames.map((quizGame) => buildQuizGame(quizGame.id))
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */

module.exports = {
  buildQuizGame,
  buildQuizGames,
}
