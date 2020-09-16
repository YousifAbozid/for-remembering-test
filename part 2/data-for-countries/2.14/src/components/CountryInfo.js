import React from "react"
import Weather from "./Weather"

const CountryInfo = ({filteredCountries}) => {
    const country = filteredCountries[0]
    
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p> 
            <p>population {country.population}</p> 
            <h2>languages</h2>
            <ul>
            {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
            </ul>
            <img src={country.flag} alt="country-flag" width="200" height="150"/>
            <h2>Weather in {country.capital} </h2>
            <Weather capital={country.capital} />
        </div>
    )
}

export default CountryInfo