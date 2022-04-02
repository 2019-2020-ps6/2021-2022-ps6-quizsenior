const { Router } = require('express')

const { QuizGame } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()


router.post('/', (req, res) => {
  try {
    const quizGame = QuizGame.create({ ...req.body })
    res.status(201).json(quizGame)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
