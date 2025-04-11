import { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.findIndex((person) => person.name.toLowerCase() === newPerson.name.toLowerCase()) !== -1) {
      if (confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personAdded = persons.find((person) => person.name === newPerson.name)
        personServices
          .update(newPerson, personAdded.id)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.name === newPerson.name ? returnedPerson : person))
            setMessage(`Numbed of ${returnedPerson.name} modified`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(() => {
            setPersons(persons.filter(person => person.name !== newPerson.name))
            setMessage(`Information of ${newPerson.name} has already been removed from the server`)
            setIsError(true)

            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 5000)
          })
      }
    } else {
      personServices
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setMessage(`Added ${addedPerson.name}`)

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personServices
        .del(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setMessage(`${name} deleted successfully`)

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setPersons(persons.filter((person) => person.name !== name))
          setMessage(`Information of ${name} has already been removed from the server`)
          setIsError(true)

          setTimeout(() => {
            setMessage(null)
            setIsError(false)
          }, 5000)
        })
    }
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} />
      <Search search={search} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Numbers search={search} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App