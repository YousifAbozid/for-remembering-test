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
    // <p> <Part part={props.part1} number={props.exercises1} /> </p> No need for p tag!
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      // <Content /> How is Content component is supposed to know about parts and exercises without passing them as props? 
      <Content 
        part1={part1} 
        part2={part2} 
        part3={part3} 
        exercises1={exercises1} 
        exercises2={exercises2} 
        exercises3={exercises3}
      />
      <Total numbers={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
