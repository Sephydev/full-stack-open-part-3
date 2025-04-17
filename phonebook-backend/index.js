const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/Person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('data', function (request, response) { return JSON.stringify(request.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


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
  Person.find({}).then(persons => {
    response.send(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`
      <p>Phonebook as info for ${persons.length} people</p>
      <p>${new Date()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).send({ error: 'name is missing' })
  }

  if (!body.number) {
    return response.status(400).send({ error: 'number is missing' })
  }

  const person = new Person({
    "name": body.name,
    "number": body.number
  })

  person.save()
    .then(person => response.send(person))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id).then(person => {
      console.log(request.body)

      person.name = request.body.name
      person.number = request.body.number

      person
        .save()
        .then(updatedPerson => response.json(updatedPerson))
        .catch((error) => next(error))
    }, { runValidators: true })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})