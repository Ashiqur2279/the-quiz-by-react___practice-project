// import "./App.css";
import { useEffect, useReducer } from "react";
import Error from "./Error";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  //'loading','error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 25;

const reducer = (state, action) => {
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
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
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
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "lastQuestion":
      return {
        ...state,
        status: "finished",
        answer: null,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "reStart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };
    // return {
    //   ...state,
    //   answer: null,
    //   status: "ready",
    //   index: 0,
    //   points: 0,
    //   highScore: 0,
    // };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("action is unknown");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //destructure the state
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prePoints, curPoints) => prePoints + curPoints.points,
    0
  );

  //option 1: fetch the data using the json server
  // useEffect(() => {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Network response is not ok");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error("there is the error to fetch the data", error);
  //     });
  // }, []);

  // option 2: fetch the data using local file
  useEffect(() => {
    fetch("src/assets/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error("network is not responding");
        return res.json();
      })
      .then((data) => {
        if (data) dispatch({ type: "dataReceived", payload: data.questions });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
