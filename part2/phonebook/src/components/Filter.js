import React from "react";

const Filter = ({query, handleQueryChange}) => {
  return(
    <div>
      Show only names containing: <input value={query} onChange={handleQueryChange} />
    </div>
  )

}

export default Filter
