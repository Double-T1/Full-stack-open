const express = require('express') //commonJS module syntax, equivalent to import exoprt ES6 syntax
const morgan = require('morgan')

//while the http webpack provided by nodeJS can do the work as well
//express makes it more convenient => try it out
const app = express() //initialize the app through express 

app.use(express.json()) //body-parser, essentially allow reqested data to be parsed into body

morgan.token('content',(req,res) => {
    return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let phonebook = [
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
app.get('/',(req,res) => {
    console.log('connected')
})

app.get('/api/persons', (req,res) => {
    res.json(phonebook)
})

app.get('/info',(req,res) => {
    res.write(`<h1>Phonebook has info for ${phonebook.length} people</h1>`)
    res.write(new Date().toString())
    res.end()
})

app.get('/api/persons/:id',(req,res) => {
    let id = parseInt(req.params.id)
    const info = phonebook.find(ele => ele.id === id) 
    
    if (info) res.json(info)
    else res.status(404).end()
})

app.delete('/api/persons/:id',(req,res) => {
    let id = parseInt(req.params.id)
    phonebook = phonebook.filter(ele => ele.id !== id)
    res.status(204).end()
})

const generateId = () => {
    let range = 0x7FFFFFFF
    return Math.floor(Math.random()*range)
}

const alreadyExist = (name) => {
    for (let ele of phonebook) {
        if (ele.name === name) return true
    }
    return false
}


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
        res.status(400).json({
            error: text
        })
    } else if (alreadyExist(body.name)) {
        res.status(400).json({
            error: "name must be unique"
        })
    } else {
        const info = {
            "id": generateId(),
            "name": body.name, 
            "number": body.number
        }
        phonebook = phonebook.concat(info)
        res.json(phonebook)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})