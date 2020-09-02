import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <p> {props.course} </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.part} {props.number} </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} number={props.exercises1} />
      <Part part={props.part2} number={props.exercises2} />
      <Part part={props.part3} number={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.numbers} </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content 
        part1={course.parts[0].name}
        part2={course.parts[1].name}
        part3={course.parts[2].name}
        exercises1={course.parts[0].exercises} 
        exercises2={course.parts[1].exercises} 
        exercises3={course.parts[2].exercises}
      />
      <Total numbers={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))