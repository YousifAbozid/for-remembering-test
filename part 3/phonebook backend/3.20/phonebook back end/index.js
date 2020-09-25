const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json()) // parse json when any request with data comes
app.use(express.static('build'))

/* this is the tiny configuration for morgan how looks like in string :
        ":method :url :status :res[content-length] - :response-time ms"     */

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :POST-data"))

/* to create a token write as follow :
morgan.token('body', (req, res) => JSON.stringify(req.body))
and without JSON.stringify() it will print [Object Object] , JSON.stringify() fixes that.
for other resources visit : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
OR look at the original documentation for morgan here : https://github.com/expressjs/morgan#morgan */

morgan.token("POST-data", (req, res) => JSON.stringify(req.body))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  }) 
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({}).then(persons => {
    response.send(`Phonebook has info for ${persons.length} people <br> <P>${new Date()}</P>`)
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name == 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } 
  next(error)
}
// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})