import React, { useEffect, useState } from "react"
import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
  const [weather, setWeather] = useState({})
  const lat = country.latlng[0]
  const lon = country.latlng[1]

  useEffect(() =>{
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res =>{
      setWeather(res.data)
    })
  }, 
  [lat, lon])

  if (!weather.main){
    return
  }
  
  return(
    <div>
      <h2>Weather in {country.capital}:</h2>
      <p>Temperature: {weather.main.temp} Celsius </p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='the current weather'/>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )

}


export default Weather