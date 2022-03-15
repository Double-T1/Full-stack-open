const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require("../models/user")

//all try catch syntax are eliminated due to the help of express-async-awiat package
//imported in app.js
notesRouter.get('/', async (req, res) => {
	const note = await Note.find({})
	res.json(note)
})

notesRouter.post('/', async (req, res) => {
	const body = req.body
	const user = await User.findById(body.userId)

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