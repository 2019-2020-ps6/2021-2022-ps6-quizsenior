const { Router } = require('express')

const { stdout } = require('nodemon/lib/config/defaults')
const { QuizDmla, QuestionDmla, AnswerDmla } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const AnswersRouter = require('./answersDmla')
const { filterQuestionsFromQuizz, getQuestionFromQuiz } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    QuizDmla.getById(req.params.quizId)
    res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  console.log('YAHOO: ', req.body)
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    QuizDmla.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    let question = QuestionDmla.create({ label: req.body.label, quizId })
    // If answersDmla have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => AnswerDmla.create({ ...answer, questionId: question.id }))
      question = { ...question, answers }
    }
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const updatedQuestion = QuestionDmla.update(req.params.questionId, { label: req.body.label, quizId: question.quizId })
    res.status(200).json(updatedQuestion)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    QuestionDmla.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answersDmla', AnswersRouter)

module.exports = router
