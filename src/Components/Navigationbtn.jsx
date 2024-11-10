import React from "react";

function Navigationbtn({ dispatch, answer, index, TotalQuestions }) {
  if (answer === null) return null;

  if (index < TotalQuestions - 1)
    return (
      <div>
        <button
          className="footer-btn"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          <h1>Next</h1>
        </button>
      </div>
    );

  if (index === TotalQuestions - 1)
    return (
      <div>
        <button
          className="footer-btn"
          onClick={() => dispatch({ type: "finish" })}
        >
          <h1>Finish</h1>
        </button>
      </div>
    );
}

export default Navigationbtn;
