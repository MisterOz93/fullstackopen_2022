import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryList from './components/CountryList'
const apiKey = process.env.REACT_APP_API_KEY


const Display = ({countries, query, handleClick}) => {
  if (!countries[0] || query === ''){
    return
  }
  const validCountries = countries.filter(country => {
    return country.name.common.toLowerCase().startsWith(query.toLowerCase())
  })
  if (validCountries.length > 10){
    return(
      <p>Too many matches ({validCountries.length}), please narrow your search. </p>
    )
  }
  if (validCountries.length > 1){
    return(
      <CountryList countries={validCountries} handleClick={handleClick} />
    )
  }
  return(
    <Country country={validCountries[0]} />
  )

}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  const queryChange = (event) => {
    setQuery(event.target.value)
  }

  const chooseCountry = (country) => {
    setQuery(country.name.common)
  }
  return(
    <div>
      Find Countries: <input value={query} onChange={queryChange}/>
      <Display countries={countries} query={query} handleClick={chooseCountry}/>
    </div>
  )
}

export default App;
