import {Part} from '../types'

interface ContentProps {
  parts: Array<Part>
}

interface CoursePartProps {
  part: Part
}


const Content = (props: ContentProps) => {
  const parts = props.parts
  return(
    <ul>
      {parts.map(p => <CoursePart part={p} key={p.name} />)}
    </ul>
  )
}

const CoursePart = (props: CoursePartProps) => {
  return <li>{props.part.name} {props.part.exerciseCount}</li>

}


export default Content