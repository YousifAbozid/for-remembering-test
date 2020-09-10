import React from "react";

export default function Course({ course }) {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </>
  );
}

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const exercises = parts.map((part) => part.exercises);
  const sum = exercises.reduce((total, exercises) => total + exercises);

  return <strong>total of {sum} exercises</strong>;
};
