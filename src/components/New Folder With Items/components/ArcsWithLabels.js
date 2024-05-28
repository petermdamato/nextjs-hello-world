import React from 'react';
import { path } from 'd3-path';

const ArcsWithLabels = () => {
  const innerRadius = 50;
  const outerRadius = 160;
  const numSegments = 5;

  const pathGenerator = path();
  const radians = Math.PI / 180;

  const arcs = [];

  const segmentAngles = [-90, -40, -10, 10, 40, 90];
  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

  for (let i = 0; i < numSegments; i++) {
    const startAngle = segmentAngles[i];
    const endAngle = segmentAngles[i + 1] || 90;
    const label = labels[i];

    const startXOuter = Math.cos(startAngle * radians) * outerRadius;
    const startYOuter = Math.sin(startAngle * radians) * outerRadius;

    const centerXOuter = Math.cos(((startAngle + endAngle) / 2) * radians) * outerRadius;
    const centerYOuter = Math.sin(((startAngle + endAngle) / 2) * radians) * outerRadius;

    const arcPath = pathGenerator.arc(0, 0, outerRadius, startAngle * radians, endAngle * radians);

    arcs.push({ arcPath, label, x: centerXOuter, y: centerYOuter - 30 }); // Adjust y-coordinate for label position
  }

  return (
    <svg width={outerRadius * 2} height={outerRadius * 2}>
      {arcs.map(({ arcPath, label, x, y }, index) => (
        <g key={index} transform={'translate(100,200)'}>
          <path d={arcPath} fill="lightblue" />
          <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
            <textPath xlinkHref={`#arc-${index}`} startOffset="50%">
              {label}
            </textPath>
          </text>
          <path id={`arc-${index}`} d={arcPath}></path>
        </g>
      ))}
    </svg>
  );
};

export default ArcsWithLabels;