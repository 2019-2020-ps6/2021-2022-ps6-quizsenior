const { Router } = require('express')

const { QuizGame } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuizGame } = require('./gameManager')
const { buildQuizGames } = require('./gameManager')

const router = new Router()


router.post('/', (req, res) => {
  try {
    const quizGame = QuizGame.create({ ...req.body })
    res.status(201).json(quizGame)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:gameId', (req, res) => {
  try {
    const game = QuizGame.getById(req.params.quizId)
    res.status(200).json(game)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    const games = QuizGame.get()
    res.status(200).json(games)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
