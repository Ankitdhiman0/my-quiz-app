import React from "react";
import Timer from "./Timer";

function Progress({ numQuestions, index, answer, points, maxPoints }) {
  return (
    <>
      <div className="progress-container">
        <div className="progress">
          <progress
            max={numQuestions}
            value={index + Number(answer !== null)}
          />
          <div className="progress-info">
            <h2>
              Questions <strong>{index + 1}</strong> / {numQuestions}
            </h2>

            <h2>
              <strong>{points}</strong> / {maxPoints}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Progress;
