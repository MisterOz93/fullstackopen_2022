import {CoursePart} from '../types'
import {assertNever} from '../utils'

interface ContentProps {
  parts: Array<CoursePart>
}

interface CoursePartProps {
  part: CoursePart
}


const Content = (props: ContentProps) => {
  const parts = props.parts
  return(
    <div>
      {parts.map(p => <Part part={p} key={p.name} />)}
    </div>
  )
}

const Part = (props: CoursePartProps) => {
  const part = props.part
  const basicInfo = (
    <p> <strong> {part.name} {part.exerciseCount} </strong></p>
  )
  switch (part.type){
    case "normal":
      return (
        <div>
          {basicInfo}
          <p><em>{part.description}</em></p>
        </div>)
    case "groupProject":
      return(
        <div>
          {basicInfo}
          <p>Group project exercises:{part.groupProjectCount}</p>
        </div>
      )
    case "submission": 
      return (
        <div>
          {basicInfo}
          <p><em>{part.description}</em></p>
          <p>Submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
    case "special":
      return(
        <div>
          {basicInfo}
          <p><em>{part.description}</em></p>
          <p>Required skills: {part.requirements.join(', ')}.</p>
        </div>
      )
    default: 
      return <p> {assertNever(part)}</p>
  }
  

}


export default Content