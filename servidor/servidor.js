const express = require('express')
const perguntas = require('./perguntas.json')
const spoilers = require('./spoilers.json')
const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.get('/perguntas', (req, res) => {
    res.json(perguntas)
})

app.get('/spoilers', (req, res) => {
  res.json(spoilers)
})

app.listen(3000)