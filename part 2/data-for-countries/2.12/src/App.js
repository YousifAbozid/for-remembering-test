import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountriesToShow = ({allCountries, countryName}) => {
  const result = allCountries.filter(country => country.name === countryName)
  const fullInfo = result.map(country => {
    return (
      <div key={country.name}>
        <h1>{country.name}</h1> 
        <p> capital {country.capital} </p>
        <p> population {country.population} </p>
        <h2> languages </h2>
        <ul> {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)} </ul>
        <img src={country.flag} alt='country flag'
        width="100" height="100" /> 
      </div>
    )
  })

  return (
    <div>
      { result.lenght > 10 ? <p>Too mant matches, specify another filter</p>
      : result.lenght <= 10 && result.lenght > 1 ? result.map(country => country.name )
      : fullInfo }
    </div>
  )
}

const App = () => {
  const [ allCountries, setAllCountries ] = useState([])
  const [ countryName, setCountryName ] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fulfilled')
        setAllCountries(response.data)
      })
  }, [])
  //console.log('render', allCountries.length, 'country')

  const handleSearch = (event) => {
    setCountryName(event.target.value)
  }

  return (
    <div>
      find counrties <input value={countryName}
      onChange={handleSearch} />
      <CountriesToShow allCountries={allCountries} countryName={countryName} />
    </div>
  )
}

export default App