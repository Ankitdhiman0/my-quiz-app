import React, { useEffect, useReducer } from "react";

import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Mainmenu from "./Components/Mainmenu";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import Finishscreen from "./Components/Finishscreen";

const TimeForOneQuestion = 30;

const initialState = {
  questions: [],

  // 'loading','error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * TimeForOneQuestion,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "Retry":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    { status, questions, index, answer, points, highScore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const TotalQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Mainmenu numQuestions={TotalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={TotalQuestions}
              index={index}
              points={points}
              answer={answer}
              maxPoints={maxPoints}
              dispatch={dispatch}
              timeRemaining={timeRemaining}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              TotalQuestions={TotalQuestions}
              timeRemaining={timeRemaining}
            />
          </>
        )}
        {status === "finished" && (
          <Finishscreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </>
  );
}

export default App;
