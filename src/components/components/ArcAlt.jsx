import React, { useState } from "react";
import OrbitSingle from "./OrbitSingle";
import { path } from "d3-path";
import { scaleLinear } from "d3-scale";
import { generateValues } from "./../util";
import theme from "./theme";
import labelConstants from "./labelConstants";
import "./styling.css";

const value = 4;

const ArcAlt = ({
  context,
  thickness,
  innerRadius,
  width,
  height,
  arcIndex,
  current = 0,
  previous = 0,
  average = 0,
  avgDeg = 0,
  redDeg = 0,
  range = 0,
}) => {
  const TrianglePath = (cx, cy, size, baseWidth, type) => {
    let path;
    if (type === "equilateral") {
      const height = (Math.sqrt(3) / 2) * size;
      const halfSize = size / 2;
      const halfBaseWidth = baseWidth / 2;

      const x1 = cx - halfBaseWidth;
      const y1 = cy + height / 2;
      const x2 = cx + halfBaseWidth;
      const y2 = cy + height / 2;
      const x3 = cx;
      const y3 = cy - size / 2;

      path = `M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} Z`;
    } else {
      const height = Math.sqrt(size * size - (baseWidth / 2) * (baseWidth / 2));
      const halfBaseWidth = baseWidth / 2;

      const x1 = cx - halfBaseWidth;
      const y1 = cy;
      const x2 = cx + halfBaseWidth;
      const y2 = cy;
      const x3 = cx;
      const y3 = cy - height;

      path = `M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} Z`;
    }

    return <path d={path} />;
  };

  const radians = Math.PI / 180;
  const fillColors =
    context === "inflation"
      ? theme.accessible.inflation
      : theme.accessible.rates;

  const rangeEnd = range;

  const rangeStart = average - (rangeEnd - average);

  const radialScale = scaleLinear()
    .domain([rangeStart, rangeEnd])
    .range([0, -180]);

  const radialScaleTriangle = scaleLinear()
    .domain([rangeStart, rangeEnd])
    .range([-90, 90]);

  const radialVal = radialScale(current);
  const radialValPrev = radialScale(previous);
  const radialValAvg = radialScale(average);
  const triangleValAvg = radialScaleTriangle(average);
  const triangleValPrev = radialScaleTriangle(previous);
  const triangleValCurr = radialScaleTriangle(current);
  const numSegments = 7;

  const outerRadius = innerRadius + thickness;

  const arcs = [];
  const textPaths = [];

  const segmentAngles = generateValues(-180, 0, 7);

  const startXOrbit =
    Math.cos((avgDeg < redDeg ? avgDeg : redDeg) * radians) *
    (outerRadius - innerRadius + 5);
  const startYOrbit =
    Math.sin((avgDeg < redDeg ? avgDeg : redDeg) * radians) *
    (outerRadius - innerRadius + 5);

  const endXOrbit =
    Math.cos((avgDeg > redDeg ? avgDeg : redDeg) * radians) *
    (outerRadius - innerRadius - 5);
  const endYOrbit =
    Math.sin((avgDeg > redDeg ? avgDeg : redDeg) * radians) *
    (outerRadius - innerRadius - 5);

  const orbitPathGen = path();

  orbitPathGen.moveTo(startXOrbit, startYOrbit);
  orbitPathGen.arc(
    0,
    0,
    innerRadius + thickness / 2 + 2,
    (avgDeg < redDeg ? avgDeg : redDeg) * radians,
    (avgDeg > redDeg ? avgDeg : redDeg) * radians
  );
  orbitPathGen.lineTo(endXOrbit, endYOrbit);
  orbitPathGen.arc(
    0,
    0,
    innerRadius + thickness / 2 - 2,
    (avgDeg > redDeg ? avgDeg : redDeg) * radians,
    (avgDeg < redDeg ? avgDeg : redDeg) * radians,
    true
  );
  orbitPathGen.closePath();

  const orbitPath = orbitPathGen.toString();

  for (let i = 0; i < numSegments; i++) {
    const pathGenerator = path();
    const textPathGen = path();

    const startAngle = i === 0 ? segmentAngles[i] : segmentAngles[i] + 1;
    const endAngle =
      i === numSegments - 1 ? segmentAngles[i + 1] : segmentAngles[i + 1] - 1;

    const startXOuter = Math.cos(startAngle * radians) * outerRadius;
    const startYOuter = Math.sin(startAngle * radians) * outerRadius;

    const endXInner = Math.cos(endAngle * radians) * innerRadius;
    const endYInner = Math.sin(endAngle * radians) * innerRadius;

    textPathGen.arc(
      width / 2,
      height,
      215,
      segmentAngles[i] * (Math.PI / 180),
      segmentAngles[i + 1] * (Math.PI / 180)
    );
    const textPath = textPathGen.toString();

    textPaths.push(textPath);

    pathGenerator.moveTo(startXOuter, startYOuter);
    pathGenerator.arc(
      0,
      0,
      outerRadius,
      startAngle * radians,
      endAngle * radians
    );
    pathGenerator.lineTo(endXInner, endYInner);
    pathGenerator.arc(
      0,
      0,
      innerRadius,
      endAngle * radians,
      startAngle * radians,
      true
    );
    pathGenerator.closePath();

    arcs.push(pathGenerator.toString());
  }

  // Calculate coordinates for triangle
  const xTrianglePrev = Math.cos(triangleValPrev * radians) * innerRadius;
  const yTrianglePrev = Math.sin(triangleValPrev * radians) * innerRadius;

  // Calculate coordinates for triangle
  const xTriangleCurr = Math.cos(triangleValCurr * radians) * innerRadius;
  const yTriangleCurr = Math.sin(triangleValCurr * radians) * innerRadius;

  return (
    <>
      {arcs.map((arcPath, index) => {
        return (
          <g
            key={"arc-" + arcIndex + "-segment-" + index}
            fill={fillColors[index]}
          >
            <path
              d={arcPath}
              transform={`translate(${width / 2},${height})`}
              style={{ opacity: 1 }}
            />
          </g>
        );
      })}
      <g
        key={"triangle-current"}
        fill={"black"}
        className="rotate-transition"
        transform={`translate(${
          width / 2
        },${height}) rotate(${-triangleValCurr})`}
      >
        <g transform={`translate(${0},${-24})`}>
          <path d="M -1 -137 L 0 -139 L 1 -137 L 7 -27 L 7 -9 A 1 1 0 1 1 -7 -9 L -7 -27 Z" />
        </g>
      </g>
      <g
        style={{
          textAnchor: "middle",
          fontSize: "22px",
          fontWeight: "bold",
          fill: theme.accessible.inflation[3],
          filter: "brightness(0.9)",
        }}
        transform={`translate(${width / 2},${height})`}
      >
        <text>{current + "%"}</text>
      </g>
      <g
        style={{
          textAnchor: "middle",
          textTransform: "uppercase",
          fontSize: "10px",
          fontWeight: "bold",
        }}
        transform={`translate(${142},${height + 12})`}
      >
        <text>{labelConstants.labels.inflation[0]}</text>
      </g>
      <g
        style={{
          textAnchor: "middle",
          textTransform: "uppercase",
          fontSize: "10px",
          fontWeight: "bold",
        }}
        transform={`translate(${width / 2},${220})`}
      >
        <text>{labelConstants.labels.inflation[3]}</text>
      </g>
      <g
        style={{
          textAnchor: "middle",
          textTransform: "uppercase",
          fontSize: "10px",
          fontWeight: "bold",
        }}
        transform={`translate(${width - 144},${height + 12})`}
      >
        <text>{"Extremely High"}</text>
      </g>
      <OrbitSingle
        radialValAvg={radialValAvg}
        radialValPrev={radialValPrev}
        valPrev={previous}
        valAvg={average}
        innerRadius={innerRadius}
        transform={`translate(${width / 2},${height})`}
      />
    </>
  );
};

export default ArcAlt;
