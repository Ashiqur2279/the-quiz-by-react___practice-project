// eslint-disable-next-line no-unused-vars
import React from "react";

/* eslint-disable react/prop-types */
const Questions = ({ questions }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h4>{questions.length} questions to test your React Mastery</h4>
      <button className="btn">Let&apos;s Start!</button>
    </div>
  );
};

export default Questions;
