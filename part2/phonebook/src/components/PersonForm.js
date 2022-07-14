import React from "react";

const PersonForm = (props) => {
  return(
    <form onSubmit={props.onSubmit}>
      <p>Name: <input required value={props.name} onChange={props.nameChange}/> </p>
      <p>Number (optional): <input value={props.number} onChange={props.numberChange}/></p>
      <button type="submit">Add to Phonebook</button>
    </form>
  )

}

export default PersonForm