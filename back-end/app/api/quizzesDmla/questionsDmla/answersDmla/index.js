const { Router } = require('express')
const { AnswerDmla } = require('../../../../models')

const { getQuestionFromQuiz } = require('../manager')
const { filterAnswersFromQuestion, getAnswerFromQuestion } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answers = filterAnswersFromQuestion(question.id)
    res.status(200).json(answers)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:answerDmlaId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerDmlaId)
    res.status(200).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answer = AnswerDmla.create({ ...req.body, questionId: question.id })
    res.status(201).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:answerDmlaId', (req, res) => {
  try {
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerDmlaId)
    const updatedAnswer = AnswerDmla.update(req.params.answerDmlaId, { ...req.body, questionId: answer.questionId })
    res.status(200).json(updatedAnswer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:answerDmlaId', (req, res) => {
  try {
    getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerDmlaId)
    AnswerDmla.delete(req.params.answerDmlaId)
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
