import React from 'react' 

const Person = ({ person, handleDeletion }) => {
  const confirmLeave = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      handleDeletion()
    }
  }

  return (
    <li>{person.name} {person.number} <button onClick={confirmLeave}>Delete</button></li>
  )
}

export default Person