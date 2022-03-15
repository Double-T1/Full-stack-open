const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require("bcrypt")
const app = require('../app')
//imports the Express application from the app.js module 
//and wraps it with the supertest function into a so-called superagent object. 
const api = supertest(app)
const Note = require('../models/note')
const User = require("../models/user")


beforeEach(async () => {
	await Note.deleteMany({})
	await Note.insertMany(helper.initialNotes)
})

describe('GET method for whole data', () => {
	test('notes are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	},  100000)
	
	test('there are two notes', async () => {
		const response = await api.get('/api/notes')
		expect(response.body).toHaveLength(helper.initialNotes.length)
	})
	
	test('the first note is about HTTP methods', async () => {
		const response = await api.get('/api/notes')
		const contents = response.body.map(r => r.content)  
		expect(contents).toContain(    
			'Browser can execute only Javascript'  
		)
	})
})

describe('GET method for specific id', () => {
	test('succeeds with a valid id', async () => {
		const notesAtStart = await helper.notesInDb()
		const noteToView = notesAtStart[0]
		const resultNote = await api	
			.get(`/api/notes/${noteToView.id}`)
			.expect(200)
			.expect('Content-type',/application\/json/)
		//parsing change JSON into JS object
		//in this case stringify convert Date object into string first
		//then parse change the string into string object
		const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
		expect(resultNote.body).toEqual(processedNoteToView)
	}, 100000)

	test('fails with statuscode 400 id is invalid', async () => {
		const invalidID = "-1"
		await api.get(`/api/notes/${invalidID}`)
			.expect(400)
	})
})

describe('POST method', () => {
	test('a valid note can be added', async () => {
		const newNote = {
			content: 'async/await simplifies making async calls',
			important: true,
		}
	
		await api
			.post('/api/notes')
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	
		const notesAtEnd = await helper.notesInDb()
		expect(notesAtEnd).toHaveLength(helper.initialNotes.length+1)
	
		const contents = notesAtEnd.map(r => r.content)
		expect(contents).toContain(
			'async/await simplifies making async calls'
		)
	})
	
	test('fails with status code 400 with invalid input', async () => {
		const newNote = {
			important: true
		}
	
		await api
			.post('/api/notes')
			.send(newNote)
			.expect(400)
		
		const notesAtEnd = await helper.notesInDb()
		expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
	})
})

describe('DELETE method', () => {
	test('success with code 204 if id is valid', async () => {
		const notesAtStart = await helper.notesInDb()
		const noteToDelete = notesAtStart[0]
	
		await api    
			.delete(`/api/notes/${noteToDelete.id}`)    
			.expect(204)

		const notesAtEnd = await helper.notesInDb()
		expect(notesAtEnd).toHaveLength(
			helper.initialNotes.length - 1
		)
	
		const contents = notesAtEnd.map(r => r.content)
		expect(contents).not.toContain(noteToDelete.content)
	})
})

describe('User DB', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username must be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})


afterAll(() => {
	mongoose.connection.close()
})
