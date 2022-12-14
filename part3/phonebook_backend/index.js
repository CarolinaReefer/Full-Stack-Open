require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')





console.log('hello world')
app.use(express.json())
app.use(morgan('tiny', {
	skip: (req, res) => {
		return req.method === 'POST'
	}
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
	skip: (req, res) => {
		return req.method !== 'POST'
	}
}))
app.use(cors())
app.use(express.static('build'))


morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})


let persons = [
	{ 
		'id': 1,
		'name': 'Arto Hellas', 
		'number': '040-123456'
	},
	{ 
		'id': 2,
		'name': 'Ada Lovelace', 
		'number': '39-44-5323523'
	},
	{ 
		'id': 3,
		'name': 'Dan Abramov', 
		'number': '12-43-234345'
	},
	{ 
		'id': 4,
		'name': 'Mary Poppendieck', 
		'number': '39-23-6423122'
	}
]

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		console.log(persons.length)
		response.json(persons)
	})
})

app.get('/info', (request, response) => {
	const timeOfRequest = Date()
	let numberOfPeopleInPhonebook = 0

	Person.find({}).then(persons => {
		numberOfPeopleInPhonebook = persons.length
		const responseContent = `<p>Phonebook has info for ${numberOfPeopleInPhonebook} people</p><p>${timeOfRequest}</p>`

		response.send(responseContent)
	})

    
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			}
			else {
				response.status(404).end()
			}
		})
		.catch(error => {
			next(error)
		})
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))

    
})

const generate_id = () => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(person => person.id))
		: 0
	return maxId + 1
}

app.post('/api/persons', (request, response, next) => {
	const body = request.body
    
	console.log(body)
	if (!body.name) {
		return response.status(400).json({
			error: 'name missing'
		})
	}

	if (!body.number) {
		return response.status(400).json({
			error: 'number missing'
		})
	}

	if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())){
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})
    
	person.save()
		.then(savedPerson => {
			console.log('person saved')
			response.json(savedPerson)
		})
		.catch(error => next(error))
        

    
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(request.params.id, person, {new: true}) 
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	console.log(error.name)

	if (error.name === 'CastError') {
		return response.status(400).send({error: 'malformatted id'})
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({error: error.message})
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})