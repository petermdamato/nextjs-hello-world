"use client"; // This is a client component

import React, {useState} from 'react';
import ArcChart from './components/ArcChart';
import Dropdown from './components/Dropdown';
import './App.css';

// <Arc innerRadius={160} outerRadius={220} startAngle={-12} endAngle={12} />
function App() {
  const [chartType,setChartType] = useState(0)
  const [clicked,setClicked] = useState(true)
  return (
    <div className="App">
      <div style={{display:'flex',alignItems: 'center',justifyContent: 'center', marginTop:'20px'}}>
        <div style={{width:'280px'}}>
      <Dropdown chartType={chartType}
      
                setChartType = {setChartType} 
                
                setClicked={setClicked}
                />
                </div>
                </div>
      <ArcChart chartType={chartType} width={800} height={500} clicked={clicked}/>
    </div>
  );
}

export default App;