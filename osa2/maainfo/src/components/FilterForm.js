import React from 'react'

const FilterForm = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <div>
      Find countries <input
      value={nameFilter}
      onChange={handleNameFilterChange}/>
    </div>
  )
}

export default FilterForm
