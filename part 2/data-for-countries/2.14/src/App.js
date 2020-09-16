import React, {useState, useEffect} from "react"
import axios from "axios"
import CountriesToShow from "./components/CountriesToShow"

const App = () => {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        //console.log(response)
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleClick = (event) => {
    setName(event.target.attributes.country.value)
  }

  return (
    <div>
      find counrties <input value={name}
      onChange={handleChange} />
      <div>
        <CountriesToShow countries={countries} name={name} handleClick={handleClick} />
      </div>
    </div>
  )
}

export default App