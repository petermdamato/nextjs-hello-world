import React, {useState,useEffect} from 'react';
import Orbit from './Orbit'
import { path } from 'd3-path';
import { scaleLinear } from 'd3-scale';
import {generateValues,pickQuadrant} from '../util'


const ArcsClickTracking = ({thickness,innerRadius,width,height,arcIndex,hoveredIndex,setHoveredIndex}) => {
  const [segment, setSegment] = useState(null)
  const radians = Math.PI / 180;
  
  const radialScale = scaleLinear().domain([0,18]).range([-180,0])

  const thresholds = generateValues(-180, 0, 7).reverse()

  const numSegments = 7;
  
  const outerRadius = innerRadius+thickness

  const arcs = [];

  const segmentAngles = generateValues(-180, 0, 7)

  const handleHover = (index) => {
    setHoveredIndex(index);
  };


  for (let i = 0; i < numSegments; i++) {
    const pathGenerator = path();
    const startAngle = segmentAngles[i]
    const endAngle = segmentAngles[i+1]

    const startXOuter = Math.cos(startAngle * radians) * outerRadius;
    const startYOuter = Math.sin(startAngle * radians) * outerRadius;

    const endXInner = Math.cos(endAngle * radians) * innerRadius;
    const endYInner = Math.sin(endAngle * radians) * innerRadius;

    pathGenerator.moveTo(startXOuter, startYOuter);
    pathGenerator.arc(0, 0, outerRadius, startAngle * radians, endAngle * radians);
    pathGenerator.lineTo(endXInner, endYInner);
    pathGenerator.arc(0, 0, innerRadius, endAngle * radians, startAngle * radians, true);
    pathGenerator.closePath();

    arcs.push(pathGenerator.toString());
  }

  return (
    <>
       {arcs.map((arcPath, index) => (
       <g 
        key={'arc-'+arcIndex+'-segment-'+index}
        fill={['#837C97','#92A7B1','#A0A27E','#FFDA98','#F6B26B','#DD7E6B','#A2525E'][index]} >
          <path 
            d={arcPath}
            transform={`translate(${width/2},${height})`}
            onMouseEnter={() => handleHover(arcIndex)}
            onMouseLeave={() => handleHover(null)}
            style={{ opacity: 0}}
            />
          </g>

      ))}
    </>
  );
};

export default ArcsClickTracking;
