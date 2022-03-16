const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require("../models/user")

//all try catch syntax are eliminated due to the help of express-async-awiat package
//imported in app.js
notesRouter.get('/', async (req, res) => {
	const note = await Note
		.find({}).populate('user',{username:1,name:1})
	res.json(note)
})

const getTokenFrom = request => {  
	const authorization = request.get('authorization')  
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
		return authorization.substring(7)  
	}  
	return null
}

notesRouter.post('/', async (req, res) => {
	const body = req.body
	const token = getTokenFrom(req)  
	const decodedToken = jwt.verify(token, process.env.SECRET)  
	if (!decodedToken.id) {    
		return res.status(401).json({ 
			error: 'token missing or invalid' 
		})  
	}  
	const user = await User.findById(decodedToken.id)

	//the user id shall remain as an Object, but parsed to string
	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
		user: user._id
	})
	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id) //create a new array rather than modifiying the original 
	await user.save()
	res.status(201).json(savedNote)
})

notesRouter.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id)
	if (note) res.json(note)
	else res.status(404).end()
})

notesRouter.delete('/',async(req,res) => {
	await Note.deleteMany({})
	res.status(204).end()
})

notesRouter.delete('/:id', async (req, res) => {
	await Note.findByIdAndRemove(req.params.id)
	res.status(204).end()
})



notesRouter.put('/:id', async (req, res) => {
	const note = {
		content: req.body.content,
		important: req.body.important
	}
	const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
	res.json(updatedNote)
})

module.exports = notesRouter