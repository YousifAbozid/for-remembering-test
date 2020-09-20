const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// this is the tiny configuration for morgan looks like in string
// ":method :url :status :res[content-length] - :response-time ms"
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "yo",
        number: "010",
        id: 5
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).send('Oops, there is nothing here.').end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    //console.log(persons)
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 5000)
  }

app.post('/api/persons/', (request, response) => {
    const body = request.body
    const nameIsExist = Boolean(persons.find(person => person.name === body.name))
    //console.log(nameIsExist)
  
    if (!body.number || !body.name) {
      return response.status(400).json({ 
        error: 'name or number is missing'
      })
    } else if (nameIsExist) {
        return response.status(400).json({ 
            error: 'name must be unique'
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br> <P>${new Date()}</P>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})