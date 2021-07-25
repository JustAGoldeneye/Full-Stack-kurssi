import React from 'react' 
import Person from './Person'

const Persons = ({ persons, nameFilter }) => {
  return (
      <ul>
        {persons
          .filter(person => person.name
          .match(new RegExp(nameFilter, "i")))
          .map(person =>
          <Person key={person.name} person={person}/>
        )}
      </ul>
    )
}

export default Persons
