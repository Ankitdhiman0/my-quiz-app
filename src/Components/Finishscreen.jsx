import React from "react";

function Finishscreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🏆";
  if (percentage >= 80 && percentage < 100) emoji = "🙌";
  if (percentage >= 50 && percentage < 80) emoji = "👍";
  if (percentage >= 20 && percentage < 50) emoji = "🤦‍♂️";
  if (percentage === 0) emoji = "❌";

  return (
    <>
      <div className="Finish-Container">
        <pre className="finish-h1">
          <h2>
            <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
            {maxPoints} ({Math.ceil(percentage)}%)
          </h2>
        </pre>
        <h2>High Score is {highScore}</h2>
        <button
          className="retry-btn"
          onClick={() => dispatch({ type: "Retry" })}
        >
          <h1>Retry</h1>
        </button>
      </div>
    </>
  );
}

export default Finishscreen;
