import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({persons, searchName, handleSearch}) => {
  const result = persons.filter(person => person.name.toUpperCase() === searchName.toUpperCase())
  return (
    <div>
    filter shown with <input value={searchName}
     onChange={handleSearch}/>
    {result.map(person =>
    <Person key={person.name} person={person} />)}
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

const Persons = ({persons}) => {
  const personsToShow = persons.map(person => person)
  return (
    <div>
      {personsToShow.map(person =>
      <Person key={person.name} person={person} />)}
    </div>
  )
}

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={persons} />
    </div>
  )
}

export default App
