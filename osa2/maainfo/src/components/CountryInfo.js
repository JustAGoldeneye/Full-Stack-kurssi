import React, { useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ country , weather, handleWeatherUpdate, api_key }) => {

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital)
      .then(response => {
        handleWeatherUpdate(response.data.current)
      })
  }, [])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h3>Languages</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={country.name} width="150"/>

      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {weather.temperature} Celcius</p>
      {console.log(weather)}
      <img src={weather.weather_icons[0]} alt="weather" width="75"/>
      <p>Wind: {weather.wind_speed} m/s to direction {weather.wind_dir}</p>
    </div>
  )
}

export default CountryInfo