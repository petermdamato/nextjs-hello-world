"use client"; // This is a client component

import React, {useState} from 'react';
import ArcChart from './components/ArcChart';
import './App.css';

function Arcs() {
  const [chartType,setChartType] = useState(0)
  const [clicked,setClicked] = useState(true)
  return (
    <div className="App">
      <ArcChart chartType={chartType} width={800} height={500} clicked={clicked}/>
    </div>
  );
}

export default Arcs;