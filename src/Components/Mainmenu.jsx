import React from "react";

function Mainmenu({ numQuestions, dispatch }) {
  return (
    <>
      <div className="hero">
        <h1 className="hero-h1">Welcome To React Quiz!</h1>
        <h2 className="hero-h2">
          {numQuestions} Questions to test your react mastery
        </h2>
        <button
          className="ready-btn"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's Start
        </button>
      </div>
    </>
  );
}

export default Mainmenu;
