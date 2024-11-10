import React from "react";
import Options from "../Components/Options";
import Navigatonbtn from "../Components/Navigationbtn";
import Timer from "../Components/Timer";

function Question({
  dispatch,
  question,
  answer,
  index,
  timeRemaining,
  TotalQuestions,
}) {
  return (
    <>
      <div className="questions-list">
        <h2 className="question">{question.question}</h2>
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
      <footer className="footer">
        <>
          <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
          <Navigatonbtn
            dispatch={dispatch}
            answer={answer}
            index={index}
            TotalQuestions={TotalQuestions}
          />
        </>
      </footer>
    </>
  );
}

export default Question;
