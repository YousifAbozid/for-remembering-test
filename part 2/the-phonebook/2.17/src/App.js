import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Search = ({persons, searchName, handleSearch}) => {
  const result = persons.filter(person => person.name.toUpperCase() === searchName.toUpperCase())
  return (
    <div>
    filter shown with <input value={searchName}
     onChange={handleSearch}/>
    {result.map(person =>
    <p key={person.name}><Person key={person.name} person={person} /></p>)}
    </div>
  )
}

const PersonForm = ({newName, newNumber, handleSubmit, handleNameChange, handleNewNumberChange}) => {
  return (
    <form onSubmit={handleSubmit} >
    <div>
      name: <input value={newName}
      onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber}
      onChange={handleNewNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, handleDelete}) => {
  return (
    <div>
      {persons.map(person => {
        return (
          <div key={person.name}>
            <p>
              <Person person={person} />
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </p>
          </div>
        )})}
    </div>
  )
}

const Person = ({ person }) => {
  return <> {person.name} {person.number} </>
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const newObject = {
      name: newName,
      number: newNumber
    }

    if (Boolean(persons.find(person => person.name === newName))) {
      alert(`${newName} is already added to phonebook`)
    } else {
        personService
          .create(newObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`delete ${person.name} ?`)) {
      return (
        personService
          .deletion(id)
          .then(data => {
            setPersons(persons.filter(person => person.id !== id))
          })
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search persons={persons} searchName={searchName} handleSearch={handleSearch} />

      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit}
      handleNameChange={handleNameChange} handleNewNumberChange={handleNewNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
