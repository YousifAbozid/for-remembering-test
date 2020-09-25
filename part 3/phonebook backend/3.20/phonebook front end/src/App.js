import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  return (
    <div className={message.success ? 'success' : 'failure'}>
      {message.content}
    </div>
  ) 
}

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
  const [message, setMessage] = useState({ content: '', success: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        showMessage('Error, couldn\'t get the data :(', false)
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        console.log(person)
        const changedNumber = {...person, number: newNumber}
        personService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            showMessage(`${person.name}'s number has changed now.`, true)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            //console.log('rejection works')
            setPersons(persons.filter(p => p !== person))
            showMessage(`Information of ${person.name} has already been removed from the server.`, false) 
            setNewName('')
            setNewNumber('')
          })
    }
    } else {
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`Added ${newName}!`, true)
      })
      .catch(error => {
        // this is the way to access the error message
        console.log(error.response.data)
        showMessage(error.response.data, false)
      })
  }}

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`delete ${person.name} ?`)) {
      return (
        personService
          .deletion(id)
          .then(data => {
            setPersons(persons.filter(person => person.id !== id))
            showMessage(`Removed ${person.name}!`, true)
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== id))
            showMessage(`${person.name} has already been removed from the server.`, false)
          })
      )
    }
  }

  const showMessage = (content, success) => {
    setMessage({ content, success })
    resetMessage(5000)

}

  const resetMessage = (duration) => {
      setTimeout(() => {
          setMessage({ content: '', success: null })
      }, duration)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message.content ? <Notification message={message} /> : null}
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
