import React from "react"

const Course = ( {course} ) => {
  
  return(
    <div>
    <h2>{course.name}</h2>
    <section>
      {course.parts.map((part) => { 
        return(
          <Part key={part.id} part={part}/>
        )
      })
      }
    </section>
    <Total parts={course.parts}/>
    </div>
  )
}

const Part = ( {part} ) => {
  
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )

}

const Total = ( {parts} ) => {
  const total = parts.map((part) => part.exercises)
    .reduce((sum, num) => sum + num)
  return(
    <p>Total of: {total} exercises.</p>
  )
}

export default Course