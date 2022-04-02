const express = require('express')

const User = require('../models/User')
const Question = require('../models/Question')

const isAuthenticated = require("../middlewares/isAuthenticated")

const router = express.Router()

router.get('', async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    console.log(e)
    res.send('error occured')
  }
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { questionText } = req.body
  const author = req.session.username
  try {
    await Question.create({ questionText, author, answer: '' })
    res.send(`question \"${questionText}\" posted!`)
  } catch (e) {
    console.log(e)
    res.send('adding question had a problem')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body
  try {
    await Question.updateOne({_id }, { answer })
    res.send('answered!')
  } catch (e) {
    console.log(e)
    res.send('answering had a problem')
  }
})

module.exports = router