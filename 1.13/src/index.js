import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  let [selected, setSelected] = useState(0);
  // create array of zeros
  const arr = new Array(anecdotes.length).fill(0);
  // create a copy of the arr array
  const copy = [...arr]
  console.log(arr)
  console.log(copy)

  function vote() {
    // increment the value in copy[selected] position by one
    copy[selected] += 1
  return (
    copy[selected]
  )
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleSelection = (selected) => {
    const newSelected = getRandomInt(anecdotes.length);
    //console.log("selected", selected);
    //console.log("newSelected", newSelected);
    return newSelected === selected
    ? handleSelection(newSelected)
    : newSelected;
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {copy[selected]} votes</p>
      <Button onClick={() => vote()} text="vote" />
      <Button onClick={() => setSelected(handleSelection(selected))}
      text="next anecdotes" />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
