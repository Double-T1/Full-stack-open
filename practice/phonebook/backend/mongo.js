const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('To insert a new contact, command as follow: node mongo.js <password> <name> <number>')
    console.log('To browse the whole phonebook, command as follow: node mongo.js <password>')
    process.exit(1) //1 means to forcibly end the program with some failure
}

const password = process.argv[2]
const url = `mongodb+srv://weichen199603:${password}@cluster0.fhib9.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const pbSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})
const Phonebook = mongoose.model('PhoneBook',pbSchema) //the first argument is for name of it in MongDB atlas

if (process.argv.length<5) {
    Phonebook.find({}).then(result => {
        result.forEach(ele => console.log(ele))
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3], number = process.argv[4]
    const entry = new Phonebook({
        name: name,
        number: number
    })
    
    entry.save().then(() => {
        console.log(`added ${name} number ${number} to the phonebook`)
        mongoose.connection.close()
    })
}





