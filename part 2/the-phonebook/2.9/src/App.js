import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

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

  const result = persons.filter(person => person.name.toUpperCase() === searchName.toUpperCase())

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }  

  const personsToShow = persons.map(person => person)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName}
         onChange={handleSearch}/>
      </div>
      {result.map(person =>
        <Person key={person.name} person={person} />
      )} 
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App
