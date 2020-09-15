import React from "react"
import CountryInfo from "./CountryInfo"

const CountriesToShow = ({ countries, name }) => {
    let filteredCountries = countries

    if (name) {
        filteredCountries = filteredCountries.filter(country => country.name.toUpperCase().includes(name.toUpperCase()))
    }

    const display = () => (filteredCountries.map(country => <div key={country.name}><li > {country.name} </li></div>))

    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (filteredCountries.length === 1) {
        return <CountryInfo filteredCountries={filteredCountries} />
    }

    return (
        <ul> {display()} </ul>
    )
}

export default CountriesToShow