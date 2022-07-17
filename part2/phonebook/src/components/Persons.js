import React from "react";

const Persons = ({persons, deletePerson}) => {
  return(
    <div>
      {persons.map(person => {
      return(
        <div key={person.name}>
          {person.name} {person.number} {}
          <button onClick={() => deletePerson(person)}>Delete</button>
        </div>
      )
      })}
    </div>
  )
}

export default Persons