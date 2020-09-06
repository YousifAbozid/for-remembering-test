import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  // state
  let [selected, setSelected] = useState(0);

  // It is better to put helper funtions inside the component. right?
  function getRandomInt(max) {
    return (
      // Math.random returns a random number between 0 and less than 1
      // thus, Math.random() * (max - 1) returns a random number between 0 and less than (6 - 1) = 5
      // No need for (+ 0), right??
      // Math.floor returns the largest integer less than or equal to a given number.
      // Math.floor(4.95) -> 4, Math.floor(4.05) -> 4
      // here is a problem you, (Math.random() * (max-1) will never reach 5, how could you then access anecdotes[5]?

      // Math.floor((Math.random() * (max-1)) + 0)

      // my solution:
      Math.floor(Math.random() * max)
    );
  }

  // the problem lies here, It's best to give setSelected the getRandomInt as an argument not a variable
  // equals to the function, to make sure the function is called every single time, I don't really know
  // why it works for a couple of times then stops but this approach solves the problem for me! see the solution below

  // let randomNumber = getRandomInt(anecdotes.length);
  console.log("selected", selected);
  // console.log("randomNumber", randomNumber);
  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      {/* setSelected is a function used to update selected variable so no need for the following approach */}

      {/* <Button onClick={() => setSelected(selected = randomNumber)} text="next anecdotes" /> */}

      <Button
        onClick={() => setSelected(getRandomInt(anecdotes.length))}
        text={"next"}
      />

      {/* there is a simple little problem, which is that sometimes the getRandomInt function gives the same
      value multiple times (check the console) which won't update the paragraph*/}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];
ReactDOM.render(
  // No need to pass the anecdotes length as in its own prop, we aleardy have access to this.
  // <App anecdotes={anecdotes} anecdotesLength={anecdotes.length} />,
  <App anecdotes={anecdotes} />,
  document.getElementById("root")
);
