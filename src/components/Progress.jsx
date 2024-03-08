// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const Progress = ({
  numQuestions,
  index,
  points,
  maxPossiblePoints,
  answer,
}) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={answer ? index + 1 : index} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
