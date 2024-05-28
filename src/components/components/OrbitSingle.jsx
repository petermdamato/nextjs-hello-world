import React from "react";
import { path } from "d3-path";
import theme from "./theme";

const OrbitSingle = ({
  context,
  valAvg,
  radialValAvg,
  valPrev,
  radialValPrev,
  transform,
  innerRadius,
}) => {
  const radians = Math.PI / 180;

  // Create a new path
  const pR = path();
  const pLeg = path();

  // Define the center coordinates
  const centerX = 0;
  const centerY = 0;

  const angleR = radialValPrev * (Math.PI / 180); // Convert angle to radians
  const angleA = -90 * (Math.PI / 180); // Convert angle to radians
  // Define the inner and outer radii
  const outerRadius = innerRadius + 40;

  // Calculate the start and end points of the line segment
  const startXR = centerX + Math.cos(angleR) * innerRadius;
  const startYR = centerY + Math.sin(angleR) * innerRadius;
  const endXR = centerX + Math.cos(angleR) * outerRadius;
  const endYR = centerY + Math.sin(angleR) * outerRadius;

  pR.moveTo(startXR, startYR);
  pR.lineTo(endXR, endYR);

  // Calculate the start and end points of the line segment
  const startXA = centerX + Math.cos(angleA) * innerRadius;
  const startYA = centerY + Math.sin(angleA) * innerRadius;
  const endXA = centerX + Math.cos(angleA) * outerRadius;
  const endYA = centerY + Math.sin(angleA) * outerRadius;

  pLeg.moveTo(startXA, startYA);
  pLeg.lineTo(endXA, endYA);
  const avgLinePathData = pLeg.toString();
  const lastLinePathData = pR.toString();

  return (
    <>
      <g transform={transform}>
        <path
          d={lastLinePathData}
          style={{
            strokeWidth: 2,
            stroke: "#d3d3d3",
            pointerEvents: "none",
          }}
        ></path>
        <g transform={`translate(${0},${-innerRadius + 10})`}>
          <text
            style={{
              textAnchor: "middle",
              fontSize: "10px",
              fill: "#D39F36",
            }}
          >
            {Math.round(valAvg * 100) / 100 + "%"}
          </text>
        </g>
        <g transform={`rotate(${radialValPrev + 90})`}>
          <g transform={`translate(0,${-innerRadius + 10})`}>
            <text
              style={{
                textAnchor: "middle",
                fontSize: "10px",
                fill: "black",
              }}
            >
              {valPrev + "%"}
            </text>
          </g>
        </g>
      </g>
      <g transform={transform}>
        <path
          d={avgLinePathData}
          style={{
            strokeWidth: 2,
            stroke: "#D39F36",
            pointerEvents: "none",
          }}
        ></path>
      </g>
    </>
  );
};

export default OrbitSingle;
