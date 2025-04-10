const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('tiny'))
app.use(express.json())




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

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook as info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.send(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).send({ error: 'name is missing' })
  }

  if (!body.number) {
    return response.status(400).send({ error: 'number is missing' })
  }

  if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
    return response.status(400).send({ error: 'name already in phonebook' })
  }

  const person = {
    "id": Math.floor(Math.random() * 1000000),
    "name": body.name,
    "number": body.number
  }

  persons = persons.concat(person)

  response.send(person)
})

PORT = 3001
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})