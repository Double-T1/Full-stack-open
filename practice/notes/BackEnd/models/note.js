const mongoose =  require('mongoose')

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minlength: 5,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	important: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
})

//setting another method/property of the noteSchema schema(or class in plain JS)
//any queried document from mongoDB will go through this once
//sort of like a middleware from our database to server
noteSchema.set('toJSON',{
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id.toString() //the auto-generated id in MongoDB is an object
		delete returnedObject._id
		delete returnedObject.__v
	}
})


module.exports = mongoose.model('Note',noteSchema)