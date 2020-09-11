import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ searchList, setSearchList ] = useState([])

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
  // my problem is lying down there but I don't understand why it's not working, can you give me a hint? :)
  const handleSearch = (event) => {
    setSearchName(event.target.value)
    persons.filter(person => {
      if (Boolean(person.name.toUpperCase() === searchName.toUpperCase())) {
        setSearchList(searchList.push(person)) 
      }
      return searchList
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  

  const personsToShow = persons.map(person => person)
    //console.log(personsToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName}
         onChange={handleSearch}/>
      </div>
      {searchList}
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
