import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryResults from './components/CountryResults'
import FilterForm from './components/FilterForm'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')
  const [ countriesShown, setCountriesShown ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setCountriesShown(response.data.length)
      })
  }, [])

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
    
    setCountriesShown(countriesToShow(event.target.value))
  }

  const countriesToShow = (filter) => {
    return (
      countries
      .filter(country => country.name
      .match(new RegExp(filter, 'i')))
    )
  }

  return (
    <div>
      <FilterForm
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}/>

      {countriesShown.length === 1
        ?
        <CountryInfo
          country={countriesShown[0]}/>
        :
        <CountryResults
          countries={countries}
          nameFilter={nameFilter}/>}
    </div>
  )
}

export default App;
