import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  let [selected, setSelected] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // here I am checking if the generated value === selected value in state, I will generate another one
  // else I will apply the change.
  const handleSelection = (selected) => {
    const newSelected = getRandomInt(anecdotes.length);
    console.log("selected", selected);
    console.log("newSelected", newSelected);
    return newSelected === selected
      ? handleSelection(newSelected)
      : newSelected;
  };

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <Button
        onClick={() => setSelected(handleSelection(selected))}
        text={"next"}
      />
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
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
