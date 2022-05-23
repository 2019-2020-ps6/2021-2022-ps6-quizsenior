const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const QuizGamesRouter = require('./quizGames')
const QuizGamesDmlaRouter = require('./quizGamesDmla')
const QuizzesDmlaRouter = require('./quizzesDmla')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/quizzesDmla', QuizzesDmlaRouter)
router.use('/users', UserRouter)
router.use('/quizGames', QuizGamesRouter)
router.use('/quizGamesDmla', QuizGamesDmlaRouter)


module.exports = router
