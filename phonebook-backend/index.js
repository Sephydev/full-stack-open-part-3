const express = require('express')
const app = express()

const persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (require, response) => {
  response.send(persons)
})

PORT = 3001
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})