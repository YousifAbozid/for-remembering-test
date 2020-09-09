import React from 'react';
import ReactDOM from 'react-dom';
/*
const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  )
}*/

const Course = ({ course }) => {
  const each = course.map(x => {
    let total = 0
    const content = x.parts.map( y => {
      total += y.exercises
      return (
          <p key={y.id}>
            {y.name} {y.exercises}
          </p>
      )
    })
    return (
      <div>
        <h2 key={x.id}> {x.name} </h2>
        <div> {content} </div>  
        <p> total of {total} exercises </p>
      </div>
    )
  })

  return (
    <div>
      <h1>Web development curriculum</h1>
      {each}
    </div>
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
  return <Course course={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))