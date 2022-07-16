import React from "react";

const CountryList = ({countries, handleClick}) => {

  return(
    <div>
      {countries.map((country) => {
        return(
          <div key={country.name.common}>
            <li>
              {`${country.name.common} `}
              <button onClick={() => handleClick(country)}>Show More</button>
            </li>
          </div>
        )
      })}
    </div>
  )
  
}


export default CountryList