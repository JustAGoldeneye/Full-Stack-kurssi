import React from 'react' 
import Person from './Person'

const Persons = ({ persons, nameFilter, handleDeletion }) => {
  return (
      <ul>
        {persons
          .filter(person => person.name
          .match(new RegExp(nameFilter, "i")))
          .map(person => 
          <Person
            key={person.id}
            person={person}
            handleDeletion={() => handleDeletion(person.id)}/>
        )}
      </ul>
    )
}

export default Persons
