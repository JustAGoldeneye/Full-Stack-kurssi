import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryResults from './components/CountryResults'
import FilterForm from './components/FilterForm'
import CountryInfo from './components/CountryInfo'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')
  const [ countriesShown, setCountriesShown ] = useState('')
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setCountriesShown(response.data.length)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=Helsinki')
      .then(response => {
        handleWeatherUpdate(response.data.current)
      })
  }, [])

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
    setCountriesShown(countriesToShow(event.target.value))
  }

  const handleInfoButtonClick = (country) => {
    setNameFilter(country.name)
    setCountriesShown(countriesToShow(country.name))
  }

  const countriesToShow = (filter) => {
    return (
      countries
      .filter(country => country.name
      .match(new RegExp(filter, 'i')))
    )
  }

  const handleWeatherUpdate = (w) => {
    setWeather(w)
  }

  return (
    <div>
      <FilterForm
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}/>

      {countriesShown.length === 1
        ?
        <CountryInfo
          country={countriesShown[0]}
          weather={weather}
          handleWeatherUpdate={handleWeatherUpdate}
          api_key={api_key}/>
        :
        <CountryResults
          countries={countries}
          nameFilter={nameFilter}
          handleInfoButtonClick={handleInfoButtonClick}/>}
    </div>
  )
}

export default App;
