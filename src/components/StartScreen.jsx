// eslint-disable-next-line no-unused-vars
import React from "react";

/* eslint-disable react/prop-types */
const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h4>{numQuestions} questions to test your React Mastery</h4>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let&apos;s Start!
      </button>
    </div>
  );
};

export default StartScreen;
