import React from "react"
import CountryInfo from "./CountryInfo"

const CountriesToShow = ({ countries, name, handleClick }) => {
    let filteredCountries = countries

    if (name) {
        filteredCountries = filteredCountries.filter(country => country.name.toUpperCase().includes(name.toUpperCase()))
    }

    const display = () => (filteredCountries.map(country => <p key={country.name}> {country.name} 
    <button onClick={handleClick} country={country.name} >show</button> </p>))

    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (filteredCountries.length === 1) {
        return <CountryInfo filteredCountries={filteredCountries} />
    }

    return display()
}

export default CountriesToShow