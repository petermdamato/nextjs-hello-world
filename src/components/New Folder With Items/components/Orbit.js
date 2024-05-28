import React from 'react'
import { path } from 'd3-path';

const Orbit = ({context,orbitPath,hoveredIndex,arcIndex,val,transform,innerRadius,avgDeg,lastMonthValue,lastMonthDegree,radialScale}) => {
    const radians = Math.PI / 180;

    const textRadians = lastMonthDegree * radians
    const textX = innerRadius * Math.cos(textRadians);
    const textY = innerRadius * Math.sin(textRadians);

    // Calculate the position of the circle along the arc using trigonometry
    const circlePosition = (angle) => {
        const radius = (innerRadius + 20); // Average of inner and outer radius
        const x = Math.cos(angle*radians) * radius;
        const y = Math.sin(angle*radians) * radius;
        return [x, y];
    };
    // Create a new path
    const pT = path();
    const pR = path();
    const pB = path();
    const pLeg = path();

    // Define the center coordinates
    const centerX = 0;
    const centerY = 0;

    // Define the angles in radians
    const angle = radialScale(avgDeg) * (Math.PI / 180); // Convert angle to radians
    const angleR = (lastMonthDegree*0.99) * (Math.PI / 180); // Convert angle to radians

    // Define the inner and outer radii
    const outerRadius = innerRadius+40;

    // Calculate the start and end points of the line segment
    const startXT = centerX + Math.cos(angle) * (innerRadius + 30);
    const startYT = centerY + Math.sin(angle) *( innerRadius + 30);
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

    // Calculate the start and end points of the line segment
    const startXLeg = centerX + Math.cos(-90) * 1;
    const startYLeg = centerY + Math.sin(-90) * 1;
    const endXLeg = centerX + Math.cos(-90) * 10;
    const endYLeg = centerY + Math.sin(-90) * 10;


    // Create a new path for the line segment
    pT.moveTo(startXT, startYT);
    pT.lineTo(endXT, endYT);

    // Create a new path for the line segment
    pB.moveTo(startXB, startYB);
    pB.lineTo(endXB, endYB);

    pR.moveTo(startXR, startYR);
    pR.lineTo(endXR, endYR);

    pLeg.moveTo(startXLeg, startYLeg);
    pLeg.lineTo(endXLeg, endYLeg);

    // Get the SVG path data
    const linePathDataTop = pT.toString();
    const linePathDataBottom = pB.toString();
    const lastLinePathData = pR.toString();

    const legPathData = pLeg.toString();

    return (
        <>
        {context === 'inflation' ? <>
        
        <path d={linePathDataTop} transform={transform} style={{ strokeWidth:2,stroke:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
        <path d={linePathDataBottom} transform={transform} style={{ strokeWidth:2,stroke:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
        <path d={lastLinePathData} transform={transform} style={{ strokeWidth:2,stroke:'#d3d3d3',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
        
            {/* Below is the 10 year rate plus shadow */}
        <text dx={0} dy={-innerRadius - 15} transform={transform} style={{ textAnchor:'middle',fontSize:14,filter:'blur(4px)',fill:'white',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 0.5 : 0 }}>{val + '%'}</text>
        <text dx={0} dy={-innerRadius - 15} transform={transform} style={{ textAnchor:'middle',fontSize:14,fill:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? .8 : 0 }}>{val + '%'}</text>
        
        {/* Below is the one month rate shadow */}
        <text x={textX} y={textY} style={{fontSize:14,filter:'blur(4px)',fill:'#d3d3d3',opacity: hoveredIndex === arcIndex ? 1 : 0}}>
                    {lastMonthValue + ' %'}
        </text>

        {/* Below is the one month rate */}
        <text x={textX} y={textY} style={{fontSize:14,fill:'grey',opacity: hoveredIndex === arcIndex ? 1 : 0}}>
                    {lastMonthValue + ' %'}
        </text>
        
        </>:context === 'inflation-old' ? <>
        
        <path d={linePathDataTop} transform={transform} style={{ strokeWidth:2,stroke:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
        <path d={linePathDataBottom} transform={transform} style={{ strokeWidth:2,stroke:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
        <path d={lastLinePathData} transform={transform} style={{ strokeWidth:2,stroke:'#d3d3d3',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 1 : 0 }}></path>
        
            {/* Below is the 10 year rate plus shadow */}
        <text dx={0} dy={-innerRadius - 15} transform={transform} style={{ textAnchor:'middle',fontSize:14,filter:'blur(4px)',fill:'white',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 0.5 : 0 }}>{val + '%'}</text>
        <text dx={0} dy={-innerRadius - 15} transform={transform} style={{ textAnchor:'middle',fontSize:14,fill:context==='inflation'?'#daa847':'#6A97AD',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? .8 : 0 }}>{val + '%'}</text>
        
        {/* Below is the one month rate shadow */}
        <text x={0} y={0} textAnchor="end" dominantBaseline="middle" style={{fontSize:14,filter:'blur(4px)',fill:'#d3d3d3',opacity: hoveredIndex === arcIndex ? 1 : 0}}>
                <textPath xlinkHref={`#arc-label-${arcIndex}`} startOffset={'100%'}>
                    <tspan x={0} dy={0}>{lastMonthValue + ' %'}</tspan>
                </textPath>
        </text>

        {/* Below is the one month rate */}
        <text x={0} y={0} textAnchor="end" dominantBaseline="middle" style={{fontSize:14,fill:'grey',opacity: hoveredIndex === arcIndex ? 1 : 0}}>
                <textPath xlinkHref={`#arc-label-${arcIndex}`} startOffset={'100%'}>
                    <tspan style={{fontSize:14,fill:'grey'}} x={0} dy={0}>{lastMonthValue + ' %'}</tspan>
                </textPath>
        </text>
        <path id={`arc-label-${arcIndex}`} d={orbitPath} style={{fill:'none'}}></path>
        
        </>:<>
        <circle r={5} cx={circlePosition(avgDeg)[0]} cy={circlePosition(avgDeg)[1]} transform={transform} style={{ fill:'black',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 0.5 : 0 }}></circle>
        <circle r={3} cx={circlePosition(lastMonthValue)[0]} cy={circlePosition(lastMonthValue)[1]} transform={transform} style={{ fill:'black',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 0.5 : 0 }}></circle>
        <circle r={6} cx={circlePosition(lastMonthValue)[0]} cy={circlePosition(lastMonthValue)[1]} transform={transform} style={{ fill:'none',strokeWidth:'2px',stroke:'black',pointerEvents:'none',opacity: hoveredIndex === arcIndex ? 0.5 : 0 }}></circle>
        </>
        }
        </>
    );
}

export default Orbit;