// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) {
    return;
  }
  return (
    <>
      {index + 1 < numQuestions ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "lastQuestion" })}
        >
          Finished
        </button>
      )}

      {/* <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button> */}
    </>
  );
};

export default NextButton;
