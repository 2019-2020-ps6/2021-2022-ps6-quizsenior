const { Router } = require('express')

const { QuizGameDmla } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
// const { buildQuizGameDmla } = require('./gameManagerDmla')
// const { buildQuizGamesDmla } = require('./gameManagerDmla')

const router = new Router()


router.post('/', (req, res) => {
  try {
    const quizGameDmla = QuizGameDmla.create({ ...req.body })
    res.status(201).json(quizGameDmla)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:gameDmlaId', (req, res) => {
  try {
    const game = QuizGameDmla.getById(req.params.quizId)
    res.status(200).json(game)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    const games = QuizGameDmla.get()
    res.status(200).json(games)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
