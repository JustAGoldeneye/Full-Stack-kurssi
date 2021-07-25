import React from 'react'

const FilterForm = ({nameFilter, handleNameFilterChange}) => {
  return (
    <div>
      filter shown with: <input
      value={nameFilter}
      onChange={handleNameFilterChange}/>
    </div>
  )
}

export default FilterForm
