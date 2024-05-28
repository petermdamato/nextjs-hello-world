import React from 'react';

const textStyle = {
    fontSize: '12px',
    fontFamily: 'Arial, sans-serif',
  };

const Legend = ({context,hoveredIndex,width,height}) => {
    return (
      <g transform ={`translate(${width/2 + 100},${height})`}>
        {hoveredIndex === null ? (
          <>
          {/* Current month level */}
          <text x="10" y="50" style={textStyle}>X.X%</text>
          <line x1="45" y1="46" x2="60" y2="46" stroke="black" strokeWidth="1" />
          <text x="65" y="50" style={textStyle}>Current month level</text>
        </>
        ) : context==='inflation' ? (
            <g transform ={`translate(${0},${10})`}>
            {/* 10-year average */}
            <path d="M 28 42 L 28 15" fill="none" stroke={context==='inflation'?'#daa847':'#6A97AD'} strokeWidth="2" />
            <text x="28" y="12" style={{...textStyle,fill:context==='inflation'?'#daa847':'#6A97AD'}}>10-year average</text>

            {/* Last month level */}
            <path d="M 28 42 L 54 27" fill="none" stroke="grey" strokeWidth="2" />
            <text x="58" y="32" style={{...textStyle,fill:'grey'}}>Last month level</text>
          </g>
          
        ) : (
            <>
              {/* Current month level */}
              <circle r={5} cx={0} cy={0} style={{ fill:'black',pointerEvents:'none' }}></circle>
              <circle r={3} cx={0} cy={0} style={{ fill:'black',pointerEvents:'none'}}></circle>
              <circle r={6} cx={0} cy={0} style={{ fill:'none',strokeWidth:'2px',stroke:'black',pointerEvents:'none'}}></circle>
            </>
          )}
      </g>
    );
}

export default Legend;