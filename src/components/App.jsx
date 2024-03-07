// import "./App.css";
import { useEffect, useReducer } from "react";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Questions from "./Questions";

const initialState = {
  questions: [],
  //'loading','error', 'ready', 'active', 'finished'
  status: "loading",
};

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

    default:
      throw new Error("action is unknown");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //destructure the state
  const { questions, status } = state;

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
        {status === "ready" && <Questions questions={questions} />}
      </Main>
    </div>
  );
}

export default App;
