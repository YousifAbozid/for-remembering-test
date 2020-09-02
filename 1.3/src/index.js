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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1.name}
        part2={part2.name}
        part3={part3.name}
        exercises1={part1.exercises} 
        exercises2={part2.exercises} 
        exercises3={part3.exercises}
      />
      <Total numbers={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))