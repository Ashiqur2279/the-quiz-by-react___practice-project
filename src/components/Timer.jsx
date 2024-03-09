import React, { useEffect } from "react";

const Timer = ({ secondsRemaining, dispatch }) => {
  const minute = Math.floor(secondsRemaining / 60);
  const second = secondsRemaining % 60;
  useEffect(() => {
    const tick = setInterval(() => {
      //   console.log("tick");
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, [dispatch]);
  return (
    <div className="timer">
      {minute < 10 ? "0" : null}
      {minute} : {second < 10 ? "0" : null}
      {second}
    </div>
  );
};

export default Timer;
