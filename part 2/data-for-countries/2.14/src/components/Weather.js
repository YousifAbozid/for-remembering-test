import React, {useState, useEffect} from "react"
import axios from "axios"

const Weather = ({capital}) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY

    /* utilize axios to fullest like the instructions said in the README file here https://github.com/axios/axios#note-commonjs-usage

        axios.get('/user', {
        params: {
          ID: 12345
        }
      })

                    instead of using this code below

    `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    */

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: api_key,
                    query: capital
                }
            }) // this code works correctly :)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    //console.log(weather)

    if (!weather) {
        return (
            <div></div>
        )
    } return (
        <div>
            <p><strong>temperature:</strong>{weather.current.temperature} Celsius</p>
            <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}/>
            <p><strong>wind:</strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather