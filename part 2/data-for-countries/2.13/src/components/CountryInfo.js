import React from "react"

const CountryInfo = ({filteredCountries}) => {
    const country = filteredCountries[0]
    
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p> 
            <p>population {country.population}</p> 
            <h2>languages</h2>
            <ul>
            {country.languages.map((lang, index) => <li key={index}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt="country-flag" width="150" height="150"/>
        </div>
    )
}

export default CountryInfo