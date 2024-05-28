import React, {useState} from 'react';
import Arcs from './Arcs'
import ArcsBackground from './ArcsBackground'
import ArcsClickTracking from './ArcsClickTracking'
import Legend from './Legend'

const valueArray = [18, 1,1,0.2,5]
const arcArr = [...Array(5).keys()]
const data = [{average:2.0,target:3.2,current:3.0},{average:2.0,target:3.5,current:3.4},{average:4.4,target:4.0,current:3.4},{average:2.1,target:3.5,current:5.1},{average:1.6,target:3.7,current:5.6}]
const labels = ['Composite','CPI', 'PCE', 'Core CPI', 'Core PCE']

const ArcChart = ({chartType,width, height,clicked}) => {
  const context = ['inflation','inflation_rate'][chartType]
  const [hoveredIndex, setHoveredIndex] = useState(null)
  return (
    <svg width={width} height={height+100}>
      {arcArr.map((arc,index)=>(
        <>
          <ArcsBackground context={context} key={'arc-bg-'+arc} avgDeg={data[index].average} redDeg={data[index].target} arcIndex={arc} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} innerRadius={90 + (45*index)} thickness={40} width={width} height={height}/>
          <Arcs clicked={clicked} context={context} labels={labels} displayText={true} value={data[index].current} key={'arc-fg-'+arc} avgDeg={data[index].average} redDeg={data[index].target} arcIndex={arc} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} innerRadius={90 + (45*index)} thickness={40} width={width} height={height}/>
          <ArcsClickTracking context={context} key={'arc-clicks-'+arc} arcIndex={arc} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} innerRadius={90 + (45*index)} thickness={45} width={width} height={height}/>
          <Legend context={context} hoveredIndex={hoveredIndex} width={width} height={height}/>
        </>
      ))}
    </svg>
  );
};

export default ArcChart;