// eslint-disable-next-line no-unused-vars
import React from "react";
import Option from "./Option";

// eslint-disable-next-line react/prop-types
const Question = ({ question, dispatch, answer }) => {
  console.log(question);
  return (
    <>
      <div>
        <h4>{question.question}</h4>
      </div>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </>
  );
};

export default Question;
