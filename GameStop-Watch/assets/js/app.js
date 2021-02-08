import React, { useState, useEffect } from "react";
import "./main.css";
import { lookup, history } from "./fetcher";

const App = () => {
  const [hasError, setErrors] = useState(false);
  const [stonks, setStonks] = useState({});

  const history = async (symbol, range = "1wk", interval = "1d") => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`;
    const res = await fetch(url);
    res
      .json()
      .then(res => {
        setStonks(res["Time Series (5min)"]);
      })
      .catch(err => setErrors(err));
  };

  useEffect(() => {
    history("AAPL");
  }, []);

  return (
    <div className="root">
      {console.log(stonks, hasError)}
      <p>Hello</p>
    </div>
  );
};

export default App;