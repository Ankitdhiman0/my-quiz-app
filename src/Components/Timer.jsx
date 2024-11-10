import React, { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <>
      <div className="timer">
        <h2>
          {minutes < 10 && "0"}
          {minutes}:{seconds < 10 && "0"}
          {seconds}
        </h2>
      </div>
    </>
  );
}

export default Timer;
