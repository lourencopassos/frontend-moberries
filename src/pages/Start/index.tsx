import React from "react";
import { useHistory } from "react-router-dom";

function StartPage() {
  let history = useHistory();

  const goToCheckout = () => {
    history.push("/subscription-parameters");
  };

  return (
    <div className="App">
      <h1>
        MoBerries Checkout for a cloud provider using React
        <span role="img" aria-label="sheep">
          {" "}
          ⚛️
        </span>
      </h1>
      <button onClick={() => goToCheckout()}>Start</button>
    </div>
  );
}

export default StartPage;
