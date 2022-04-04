const { Router } = require('express')

const { QuizGame } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuiz } = require('../quizGame/gameManager')
const { buildQuizz } = require('../quizzes/manager')

const router = new Router()


router.post('/', (req, res) => {
  try {
    const quizGame = QuizGame.create({ ...req.body })
    res.status(201).json(quizGame)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuiz(req.params.id)
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
