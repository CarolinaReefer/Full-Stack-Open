const express = require('express')
const app = express()

console.log("hello world")

let data = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
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
    response.json(data)
})

app.get('/info', (request, response) => {
    const timeOfRequest = Date()
    const numberOfPeopleInPhonebook = data.length

    const responseContent = `<p>Phonebook has info for ${numberOfPeopleInPhonebook} people</p><p>${timeOfRequest}</p>`

    response.send(responseContent)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})