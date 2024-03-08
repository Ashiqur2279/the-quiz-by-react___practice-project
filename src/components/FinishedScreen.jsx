// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const FinishedScreen = ({ points, maxPossiblePoints, highScore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;

  // emoji = percentage === 0 || percentage <= 30 ? "😥" : null;
  // emoji = percentage >= 31 || percentage <= 60 ? "🙂" : null;
  // emoji = percentage >= 61 || percentage <= 90 ? "🥰" : null;
  // emoji = percentage >= 91 || percentage <= 99 ? "😍" : null;
  // emoji = percentage === 100 ? "💥" : null;

  if (percentage === 0 || percentage <= 30) {
    emoji = "😥";
  } else if (percentage <= 60) {
    emoji = "🙂";
  } else if (percentage <= 90) {
    emoji = "🥰";
  } else if (percentage <= 99) {
    emoji = "😍";
  } else {
    emoji = "💥";
  }
  return (
    <>
      <p className="result">
        {emoji} {"  "}You Scored {points} out of {maxPossiblePoints} (
        {Math.round(percentage)}%) {"  "} {emoji}
      </p>
      <p className="highScore">(The High Score is {highScore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reStart" })}
      >
        ReStart Quiz
      </button>
    </>
  );
};

export default FinishedScreen;
