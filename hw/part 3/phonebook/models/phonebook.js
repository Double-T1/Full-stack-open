const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)
mongoose.connect(url)
    .then(() => {
        console.log(`connected to MongoDB`)
    })
    .catch(err => {
        console.log('connection failed due to: ',err.message)
    })

const validator = c => /^\d{2,4}[-]\d{5,}$/.test(c)
const message = prop => `${prop.values} does not abide valid number format`

//create the phoneBook cluster
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {validator,message}
    }
})

// make sure the returned documnet is in the format we desired
// which is without auto-generated __v property
// and with a String type id instead of the initial Object type id
contactSchema.set('toJSON',{
    'transform': (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('PhoneBook',contactSchema)
