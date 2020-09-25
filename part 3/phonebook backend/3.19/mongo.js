const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

// to see how argv works follow this link: https://nodejs.org/docs/latest-v8.x/api/process.html#process_process_argv
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = 
    `mongodb+srv://yousif:${password}@cluster0.ldd8g.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length == 3) {
    console.log('start showing all...')
    //console.log(process.argv.length)
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
    mongoose.connection.close()
    })
} else {
    console.log('start saving info...')
    person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    })
}