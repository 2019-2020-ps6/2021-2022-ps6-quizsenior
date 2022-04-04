
const { QuizGame, Quiz } = require('../../models')
const { filterQuestionsFromQuizz } = require('../quizzes/questions/manager');
const { filterAnswersFromQuestion } = require('../quizzes/questions/answers/manager');


/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizGame = (quizId) => {
  const quiz = QuizGame.getById(quizId)
  return { ...quiz }
}

const buildQuiz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  const questions = filterQuestionsFromQuizz(quiz.id)
  const questionWithAnswers = questions.map((question) =>  {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers: answers }
  })
  return { ...quiz, questions: questionWithAnswers }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */

module.exports = {
  buildQuizGame,
}
