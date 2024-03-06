// import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("../assets/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response is not ok");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("there is the error to fetch the data", error);
      });
  }, []);
  console.log(data.questions);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions</p>
      </Main>
    </div>
  );
}

export default App;
