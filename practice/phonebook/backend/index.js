require('dotenv').config()
const express = require('express') //commonJS module syntax, equivalent to import exoprt ES6 syntax
const morgan = require('morgan')
const cors = require('cors')
const PhoneBook = require('./models/phonebook.js')
const phonebook = require('./models/phonebook.js')

//while the http webpack provided by nodeJS can do the work as well
//express makes it more convenient => try it out
const app = express() //initialize the app through express 

app.use(express.json()) //body-parser, essentially allow reqested data to be parsed into body
app.use(cors())
app.use(express.static('build')) //to read the static website frontend at the build dir

//a logger middleware
morgan.token('content',(req,res) => {
    return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

//CRUD methods
app.get('/',() => console.log('connected'))

app.get('/api/persons', (req,res,next) => {
    PhoneBook.find({})
        .then(phonebook => res.json(phonebook))
        .catch(err => next(err))
})

app.get('/info',(req,res) => {
    PhoneBook.countDocuments({})
        .then(count => {
            res.write(`<h1>Phonebook has info for ${count} people</h1>`)
            res.write(new Date().toString())
            res.end()
        })
})

app.get('/api/persons/:id',(req,res,next) => {
    PhoneBook.findById(req.params.id) 
        .then(contact => {
            if (contact) res.json(contact)
            else res.status(404).end()
        }) 
        .catch(err => next(err))
})

app.delete('/api/persons/:id',(req,res,next) => {
    PhoneBook.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch(err => next(err))
})

//for now, we don't have any actual input or output
app.post('/api/persons',(req,res) => {
    let body = req.body
    if (!body.name || !body.number) {
        let text = 'name is missing'
        if (!body.number) {
            if (!body.name) {
                text = 'number and ' + text
            } else {
                text = text.replace('name','number')
            }
        } 
        res.status(400).json({error: text})
    } else {
        let newContact = new PhoneBook({
            "name": body.name, 
            "number": body.number
        })

        newContact.save()
            .then(savedContact => res.json(savedContact))
    }
})

app.put('/api/persons/:id',(req,res,next) => {
    const {name,number} = req.body
    PhoneBook.findByIdAndUpdate(
        req.params.id,
        {name,number},
        {new: true,runValidators: true, context:'query'}
    )  
        .then(updatedContact => res.json(updatedContact))
        .catch(error => next(error))
})

//thie errorHandler is designed specific for malformatted id
const errorHandler = (err,req,res,next) => {
    console.log(err.message)
    if (err.name === 'CastError') return res.status(400).send({message: 'malformatted id'})
    else if (err.name === 'ValidationError') return res.status(400).json({message: err.message})
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})