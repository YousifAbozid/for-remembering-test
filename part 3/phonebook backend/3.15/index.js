const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
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

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br> <P>${new Date()}</P>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})