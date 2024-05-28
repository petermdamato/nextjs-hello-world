import React, {useState} from 'react';
import { path } from 'd3-path';
import { scaleRadial } from 'd3-scale';
import {generateValues} from '../util'

const ArcsLegend = ({context,thickness,displayText,innerRadius,width,height,arcIndex}) => {
  const radians = Math.PI / 180;
  const fillColors = context==='inflation'?['#837C97','#92A7B1','#A0A27E','#FFDA98','#F6B26B','#DD7E6B','#A2525E']:['#4a913c','#77af82','#a9e0db','#c8dfea','#f6d0d0','#dd9298','#a2525e']
  const radialScale = scaleRadial().domain([-2,10]).range([-Math.PI,0])

  const numSegments = 7;
  
  const outerRadius = innerRadius+thickness

  const arcs = [];
  const textPaths = [];

  const segmentAngles = generateValues(-180, 0, 7)

  const startAngle = -180;
  const endAngle = 0;

  for (let i = 0; i < numSegments; i++) {
    const pathGenerator = path();
    const textPathGen = path();

    const startAngle = i === 0 ? segmentAngles[i] : segmentAngles[i] + 1;
    const endAngle = (i === numSegments - 1) ? segmentAngles[i + 1] : segmentAngles[i + 1] - 1

    const startXOuter = Math.cos(startAngle * radians) * outerRadius;
    const startYOuter = Math.sin(startAngle * radians) * outerRadius;

    const endXInner = Math.cos(endAngle * radians) * innerRadius;
    const endYInner = Math.sin(endAngle * radians) * innerRadius;

    textPathGen.arc(width/2, height, innerRadius+24, segmentAngles[i] * (Math.PI / 180), segmentAngles[i+1]*(Math.PI / 180));
    const textPath = textPathGen.toString();

    textPaths.push(textPath)

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
        fill={fillColors[index]} >
          <path 
            d={arcPath}
            transform={`translate(${width/2},${height})`}
            style={{ opacity: 1 }}
            />
              <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" style={{fontSize:10}}>
              <textPath xlinkHref={`#arc-text-${index}`} startOffset="50%">
                  <tspan style={{display:displayText?'':'none'}} x={0} dy={index === 3 ? 0 : "-1.2em"}>{[['Extremely Low', 'Significantly Low', 'Somewhat Low', 'Average', 'Somewhat Elevated','Significantly Elevated', 'Extremely Elevated'],['Falling Sharply', 'Falling', 'Falling Gently', 'Still', 'Rising Gently','Rising', 'Rising Sharply']][context==="inflation"?0:1][index].split(' ')[0]}</tspan>
                  <tspan style={{display:displayText?'':'none'}}  x={0} dy={index === 3 ? 0 : "1.2em"}>{[['Extremely Low', 'Significantly Low', 'Somewhat Low', 'Average', 'Somewhat Elevated','Significantly Elevated', 'Extremely Elevated'],['Falling Sharply', 'Falling', 'Falling Gently', 'Still', 'Rising Gently','Rising', 'Rising Sharply']][context==="inflation"?0:1][index].split(' ')[1]}</tspan>
              </textPath>
            </text>
            <path id={`arc-text-${index}`} d={textPaths[index]} style={{fill:'none'}}></path>
          </g>
      ))}
    </>
  );
};

export default ArcsLegend;