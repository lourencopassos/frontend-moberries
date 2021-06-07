import React from "react";
import { useHistory } from "react-router-dom";

function StartPage() {
  let history = useHistory();

  const goToStart = () => {
    history.push("/");
  };

  return (
    <div className="App">
      <h1>Sucess!</h1>
      <button onClick={() => goToStart()}>Restart</button>
    </div>
  );
}

export default StartPage;
