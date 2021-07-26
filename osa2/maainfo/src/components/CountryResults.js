import React from 'react'
import CountryResult from './CountryResult'

const CountryResults = ({ countries, nameFilter }) => {
  const countriesToShow = countries
    .filter(country => country.name
    .match(new RegExp(nameFilter, 'i')))
    .map(country =>
      <CountryResult key={country.name} country={country}/>
    )

  return(<ul>{countriesToShow}</ul>)
}

export default CountryResults