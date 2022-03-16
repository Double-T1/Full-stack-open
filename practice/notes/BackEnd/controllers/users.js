const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

usersRouter.get('/test/',async(req,res) => {
	res.json({
		test: 'test'
	})
})

usersRouter.get('/:id', async (req,res) => {
	const user = await User.findById(req.params.id)
	if(user) res.json(user)
	else res.status(404).end()
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body
	const existingUser = await User.findOne({ username })  
	if (existingUser) {    
		return response.status(400).json({      
			error: 'username must be unique'    
		})  
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})


usersRouter.delete('/:id', async (req,res) => {
	console.log(req.params.id)
	await User.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = usersRouter