const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log('Wrong number of argument in your command-line')
  process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://sephydev:${password}@cluster0.pn6ypcv.mongodb.net/Phonebook?
retryWrites=true$w=majority&appName=Cluster0`

mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const person = mongoose.model('person', personSchema)

if (process.argv.length < 4) {
  person.find({}).then(persons => {
    persons.forEach(person => console.log(person))

    mongoose.connection.close()
  })
} else {

  const name = process.argv[3]
  const number = process.argv[4]

  const newPerson = new person({
    name: name,
    number: number,
  })

  newPerson.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}