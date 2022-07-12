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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return(
    <div>
      <h2>Web Development Curriculum</h2>
      <section>
        {courses.map((course) => {
          return(
            <Course key={course.id} course={course}/>
          )
        })
        }
      </section>
    </div>
  )
}

export default App;
