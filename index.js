const express = require('express')
var morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellos",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`
    <p>The phonebook has entries for ${persons.length} people</p>
    <p>${Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    response.json(person)
})

app.post('/api/persons', (request, response) => {

    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if (persons.find(p => p.name == person.name)) {
        return response.status(409).json({
            error: 'name already exists'
        })
    }

    person.id = Math.floor(Math.random() * 100000);
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id != id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
