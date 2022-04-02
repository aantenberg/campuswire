const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://aanten:XqZ5xAD57%40Zx3X8@cluster0.t4t2q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.use(cookieSession({
  name: 'session',
  keys: ['username', 'password'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use(express.json())

app.use(express.static('dist')) // set the static folder

app.use('/account', AccountRouter)
app.use('/questions', QuestionRouter)


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3000, () => {
  console.log('listening on 3000')
})