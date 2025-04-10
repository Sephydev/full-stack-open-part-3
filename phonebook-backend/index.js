const express = require('express')
const app = express()

let persons = [
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

app.get('/info', (require, response) => {
  response.send(`
    <p>Phonebook as info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  )
})

app.get('/api/persons/:id', (require, response) => {
  const id = require.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.send(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (require, response) => {
  const id = require.params.id
  persons = persons.filter(person => person.id !== id)
  response.end()
})

PORT = 3001
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})