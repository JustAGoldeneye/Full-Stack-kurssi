import React from 'react'

const CountryResult = ({ country, handleInfoButtonClick }) => {
  return (
    <li>
      {country.name}
      <button onClick={
        ()=> handleInfoButtonClick(country)}>
          show
          </button>
    </li>
  )
}

export default CountryResult