import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('success')

  const showNotification = (message, messageType) => {
    setMessageType(messageType)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameUsages = persons.filter(person => person.name === newName)
    if (nameUsages.length > 0) {
      if (window.confirm(`${nameUsages[0].name} is already on the phonebook, replace the old number with a new one?`)) {
        changeNumber(nameUsages[0].id)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${returnedPerson.name}`, 'success')
        })      
    }
  }

  const changeNumber = id => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person,  number: newNumber }

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`The phone number has been updated for ${person.name}`,'success')
      })
      .catch(error => {
        console.log(error)
        showNotification(`Information of ${person.name} has already been removed from server`, 'error')
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const deletePerson = id => { 
    const person = persons.find(n => n.id === id)

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification(`Deleted ${person.name}`, 'success')
      })
      .catch(error => {
        console.log(error)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleDeletion = (id) => {
    deletePerson(id)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
      <FilterForm nameFilter={nameFilter} handleNameFilterChange = {handleNameFilterChange}/>
      <h2>Add a New</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        handleDeletion={handleDeletion}/>
    </div>
  )

}

export default App