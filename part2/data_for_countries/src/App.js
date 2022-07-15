import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Display = ({countries, query}) => {
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
      <ul>
        {validCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
    )
  }
  const country = validCountries[0]
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km<sup>2</sup></p>
      <h4>Languages Spoken:</h4>
      <ul>
        {Object.entries(country.languages).map(langs => <li key={langs[1]}>{langs[1]}</li>)}
      </ul>
      {console.log(country)}
      <img src={country.flags.png} alt={`The flag of ${country.name.common}`}/>
    </div>
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
  return(
    <div>
      Find Countries: <input value={query} onChange={queryChange}/>
      <Display countries={countries} query={query}/>
    </div>
  )
}

export default App;
