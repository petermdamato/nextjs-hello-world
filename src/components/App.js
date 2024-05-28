"use client"; // This is a client component

import "./App.css";
import { useState, useEffect } from "react";
import ArcChart from "./components/ArcChart";
import Dropdown from "./components/Dropdown";

function App() {
  const [chartType, setChartType] = useState(0);
  const [clicked, setClicked] = useState(true);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ width: "280px" }}>
          <Dropdown
            chartType={chartType}
            setChartType={setChartType}
            clicked={clicked}
            setClicked={setClicked}
          />
        </div>
      </div>
      <ArcChart
        chartType={chartType}
        width={800}
        height={500}
        clicked={clicked}
      />
    </div>
  );
}

export default App;
