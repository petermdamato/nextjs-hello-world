import React from 'react'
import { path } from 'd3-path';

const OrbitRate = ({context,textPath,hoveredIndex,arcIndex,val,valG, transform,innerRadius,avgDeg,redDeg}) => {

// Create a new path
const pT = path();
const pR = path();
const pB = path();

// Define the center coordinates
const centerX = 0;
const centerY = 0;

// Define the angles in radians
const angle = avgDeg * (Math.PI / 180); // Convert angle to radians
const angleR = redDeg * (Math.PI / 180); // Convert angle to radians

// Define the inner and outer radii
const outerRadius = innerRadius+40;

// Calculate the start and end points of the line segment
const startXT = centerX + Math.cos(angle) * (innerRadius + 28);
const startYT = centerY + Math.sin(angle) *( innerRadius + 28);
const endXT = centerX + Math.cos(angle) * outerRadius;
const endYT = centerY + Math.sin(angle) * outerRadius;

// Calculate the start and end points of the line segment
const startXB = centerX + Math.cos(angle) * innerRadius;
const startYB = centerY + Math.sin(angle) * innerRadius;
const endXB = centerX + Math.cos(angle) * (outerRadius - 32);
const endYB = centerY + Math.sin(angle) * (outerRadius- 32);
// Calculate the start and end points of the line segment
const startXR = centerX + Math.cos(angleR) * innerRadius;
const startYR = centerY + Math.sin(angleR) * innerRadius;
const endXR = centerX + Math.cos(angleR) * outerRadius;
const endYR = centerY + Math.sin(angleR) * outerRadius;

// Create a new path for the line segment
pT.moveTo(startXT, startYT);
pT.lineTo(endXT, endYT);

// Create a new path for the line segment
pB.moveTo(startXB, startYB);
pB.lineTo(endXB, endYB);

pR.moveTo(startXR, startYR);
pR.lineTo(endXR, endYR);

// Get the SVG path data
const linePathDataTop = pT.toString();
const linePathDataBottom = pB.toString();
const redLinePathData = pR.toString();

return (
    <>
       <path d={linePathDataTop} transform={transform} style={{ strokeWidth:2,stroke:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
       <path d={linePathDataBottom} transform={transform} style={{ strokeWidth:2,stroke:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
       <path d={redLinePathData} transform={transform} style={{ strokeWidth:2,stroke:'#d3d3d3',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>

       <text dx={-8} dy={-innerRadius - 15} transform={transform} style={{ fontSize:10,filter:'blur(4px)',fill:'white',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 0.5 : 0 }}>{val + '%'}</text>
       <text dx={-8} dy={-innerRadius - 15} transform={transform} style={{ fontSize:10,fill:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? .8 : 0 }}>{val + '%'}</text>
       <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" style={{fontSize:10,filter:'blur(4px)',fill:'#d3d3d3',opacity: hoveredIndex === arcIndex ? 1 : 0}}>
              <textPath xlinkHref={`#arc-label-${arcIndex}`} startOffset={valG<10?"72%":"95%"}>
                  <tspan x={0} dy={'2.3em'}>{valG + ' %'}</tspan>
              </textPath>
       </text>
       <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" style={{fontSize:10,fill:'grey',opacity: hoveredIndex === arcIndex ? 1 : 0}}>
              <textPath xlinkHref={`#arc-label-${arcIndex}`} startOffset={valG<10?"72%":"95%"}>
                  <tspan style={{fontSize:10,fill:'grey'}} x={0} dy={'2.3em'}>{valG + ' %'}</tspan>
              </textPath>
       </text>
        <path id={`arc-label-${arcIndex}`} d={textPath} style={{fill:'none'}}></path>
    </>
  );
}

export default OrbitRate;