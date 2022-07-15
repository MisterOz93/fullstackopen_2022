import React from "react"

const Country = ({country}) => {
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km<sup>2</sup></p>
      <h4>Languages Spoken:</h4>
      <ul>
        {Object.entries(country.languages).map(langs => <li key={langs[1]}>{langs[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt={`The flag of ${country.name.common}`}/>
    </div>
  )

}

export default Country