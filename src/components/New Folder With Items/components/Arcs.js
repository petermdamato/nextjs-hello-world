import React, {useState,useEffect,useRef} from 'react';
import Orbit from './Orbit'
import { path } from 'd3-path';
import { scaleLinear } from 'd3-scale';
import {generateValues,pickQuadrant,findIndices,anglePicker} from './../util'


const Arcs = ({context,labels,thickness,displayText,innerRadius,width,height,arcIndex,hoveredIndex,setHoveredIndex, avgDeg, redDeg,currentDeg, value,clicked}) => {
  const fillColors = context==='inflation'?['#837C97','#92A7B1','#A0A27E','#FFDA98','#F6B26B','#DD7E6B','#A2525E']:['#4a913c','#77af82','#a9e0db','#c8dfea','#f6d0d0','#dd9298','#a2525e']
  const [segment, setSegment] = useState(null)
  const [leftRight, setLeftRight] = useState('left')
  const [textWidth, setTextWidth] = useState(0)
  const [textWidthLast, setTextWidthLast] = useState(0)
  const textRef = useRef(null);
  const textRefLast = useRef(null);
  const radians = Math.PI / 180;
  const rangeEnd = avgDeg * 4
  const rangeStart = avgDeg - (rangeEnd - avgDeg) 

  const radialScale = scaleLinear().domain([rangeStart,rangeEnd]).range([-180,0])

  const radialVal = radialScale(value)

  const thresholds = generateValues(-180, 0, 7).reverse()
  const quadrant = pickQuadrant(thresholds,radialVal)
  const leftRightPick = findIndices(quadrant[0],thresholds,radialVal)

  useEffect(() => {
    
    setSegment(quadrant)
    
    setLeftRight(leftRightPick)
  },[radialVal,]);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.getBoundingClientRect().width;
      setTextWidth(width);
    }
  }, [value]);

  useEffect(() => {
    if (textRefLast.current) {
      const width = textRefLast.current.getBoundingClientRect().width;
      setTextWidthLast(width);
    }
  }, [redDeg]);

  const numSegments = 7;
  
  const outerRadius = innerRadius+thickness

  const radius =(outerRadius+innerRadius) / 2 - 2

  const arcs = [];
  const textPaths = [];

  const segmentAngles = generateValues(-180, 0, 7)

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  
  const currentTextPathGen = path();
  const lastMonthTextPathGen = path();
  const offsetFactor = (leftRight === 'left' && radialVal > -90)? 0.99 : 1
  const offsetAngle = (leftRight === 'left' && radialVal > -90)? 0 : ((textWidth) / radius) * 180 / Math.PI;
  
  // Actual current value of bar, adds in offset
  currentTextPathGen.arc(width/2, height, radius , -180 * (Math.PI/180), ((radialScale(value*offsetFactor)+offsetAngle)*(Math.PI / 180)));

  const currentPath = currentTextPathGen.toString()

  const offsetAngleLast = ((textWidthLast) / radius) * 180 / Math.PI;
  
  const breakSafeAngle = anglePicker(segmentAngles,radialScale(redDeg))

  // Actual last's month's value, adds in offset
  if (radialScale(redDeg) > -92 && radialScale(redDeg) < -88) {
    // Put logic for extended line here
    lastMonthTextPathGen.arc(width/2, height, radius , -180 * (Math.PI/180), ((breakSafeAngle+offsetAngleLast+2)*(Math.PI / 180)));
  } else if (radialScale(redDeg) >= -88) {
    lastMonthTextPathGen.arc(width/2, height, radius , -180 * (Math.PI/180), ((breakSafeAngle+offsetAngleLast+2)*(Math.PI / 180)));
  } else {
    lastMonthTextPathGen.arc(width/2, height, radius , -180 * (Math.PI/180), ((breakSafeAngle)*(Math.PI / 180)));
  }

  const lastMonthPath = lastMonthTextPathGen.toString()

  for (let i = 0; i < numSegments; i++) {
    const pathGenerator = path();
    const textPathGen = path();
    
    const startAngle = (i >= 3 ||  segmentAngles[i] > radialVal) ? segmentAngles[i] + 1 : segment && radialVal < segmentAngles[i + 1] && radialVal > segmentAngles[i + 1] - 1 ? segmentAngles[i + 1] - 1 : radialVal;
    const endAngle = (i <= 3 ||  segmentAngles[i + 1] < radialVal) ? segmentAngles[i + 1] - 1 : segment && radialVal < segmentAngles[segment[0]] + 1 ? segmentAngles[i] + 1 : radialVal

    const startXOuter = Math.cos(startAngle * radians) * outerRadius;
    const startYOuter = Math.sin(startAngle * radians) * outerRadius;

    const endXInner = Math.cos(endAngle * radians) * innerRadius;
    const endYInner = Math.sin(endAngle * radians) * innerRadius;

    textPathGen.arc(width/2, height, 320, segmentAngles[i] * (Math.PI / 180), segmentAngles[i+1]*(Math.PI / 180));
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
       <g>
          <text ref={textRef} x={0} y={0}  textAnchor="middle" dominantBaseline="middle" style={{opacity:0}}>
            {value}%
          </text>
       </g>
       <g>
          <text ref={textRefLast} x={0} y={0}  textAnchor="middle" dominantBaseline="middle" style={{opacity:0}}>
            {redDeg}%
          </text>
       </g>
       {arcs.map((arcPath, index) => (
       <g 
        key={'arc-'+arcIndex+'-segment-'+index}
        fill={fillColors[index]} >
          <path 
            d={arcPath}
            transform={`translate(${width/2},${height})`}
            style={{ opacity: index === 3 || segment && segment.includes(index) ? 1 : 0 }}
            />
              <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" style={{fontSize:12}}>
              <textPath xlinkHref={`#arc-${index}`} startOffset="50%">
                  <tspan style={{display:displayText?'':'none',filter: 'brightness(0.8)'}} x={0} dy={index === 3 ? 0 : "-1.2em"}>{[['Extremely Low', 'Significantly Low', 'Somewhat Low', 'Average', 'Somewhat Elevated','Significantly Elevated', 'Extremely Elevated'],['Falling Sharply', 'Falling', 'Falling Gently', 'Still', 'Rising Gently','Rising', 'Rising Sharply']][context==="inflation"?0:1][index].split(' ')[0]}</tspan>
                  <tspan style={{display:displayText?'':'none',filter: 'brightness(0.8)'}}  x={0} dy={index === 3 ? 0 : "1.2em"}>{[['Extremely Low', 'Significantly Low', 'Somewhat Low', 'Average', 'Somewhat Elevated','Significantly Elevated', 'Extremely Elevated'],['Falling Sharply', 'Falling', 'Falling Gently', 'Still', 'Rising Gently','Rising', 'Rising Sharply']][context==="inflation"?0:1][index].split(' ')[1]}</tspan>
              </textPath>
            </text>
            <path id={`arc-${index}`} d={textPaths[index]} style={{fill:'none'}}></path>
            <text x={0} y={0}  textAnchor="middle" dominantBaseline="middle" style={{opacity:!clicked?0:hoveredIndex===null?1:0,fontSize:14,textAnchor:(leftRight === 'left' ? "end" : "end"),fill:(((leftRight === 'left' && radialVal > -90)||(leftRight === 'right' && radialVal < -90))? "white" : "black")}}>
              <textPath xlinkHref={`#arc-curr-${arcIndex}`} startOffset={leftRight === 'left' ? "100%" : "100%"}>
                {value}%
              </textPath>
            </text>

            <path id={`arc-curr-${arcIndex}`} d={currentPath} style={{fill:'none'}}></path>
            <Orbit 
              context={context}
              arcIndex={arcIndex}
              hoveredIndex={hoveredIndex}
              orbitPath={lastMonthPath}
              innerRadius={innerRadius}
              lastMonthValue={redDeg}
              lastMonthDegree={breakSafeAngle}
              avgDeg={avgDeg}
              val={avgDeg}
              valG={value}
              radialScale={radialScale}
              transform={`translate(${width/2},${height})`}
              offset={offsetAngleLast}
            />
          </g>
      ))}
      <text transform={`translate(${110+ ((thickness + 5) * arcIndex)},${height + 8}) rotate(-90)`}  textAnchor="end" dominantBaseline="middle" style={{fontSize:10,opacity:hoveredIndex===null||hoveredIndex===4-arcIndex?1:0.2}}>
        {labels[arcIndex]}
      </text>
      
    </>
  );
};

export default Arcs;
