import React, { useState } from "react";
import { path } from "d3-path";
import { scaleLinear } from "d3-scale";
import { generateValues } from "./../util";
import theme from "./theme";

const value = 4;

const Arc = ({
  context,
  thickness,
  innerRadius,
  width,
  height,
  arcIndex,
  current,
  previous,
  average,
  avgDeg,
  redDeg,
  range,
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
    .range([-180, 0]);

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

  // svg
  //   .append("path")
  //   .attr("d", triangle)
  //   .attr("transform", `translate(${150 + x},${150 + y}) rotate(${degree})`)
  //   .attr("fill", "red")
  //   .attr("stroke", "none");

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
      <g key={"triangle-average"} fill={fillColors[3]}>
        <g transform={`translate(${width / 2},${height - 119})`}>
          {TrianglePath(0, 0, 18, 18, "isosceles")}
        </g>
      </g>
      <g
        key={"triangle-previous"}
        fill={"grey"}
        transform={`translate(${
          width / 2
        },${height}) rotate(${triangleValPrev})`}
      >
        <g transform={`translate(${0},${-innerRadius + 16})`}>
          {TrianglePath(0, -8, 15, 12, "equilateral")}
        </g>
      </g>
      <g
        key={"triangle-current"}
        fill={"black"}
        transform={`translate(${
          width / 2
        },${height}) rotate(${triangleValCurr})`}
      >
        <g transform={`translate(${0},${-innerRadius + 16})`}>
          {TrianglePath(0, -9, 13, 6, "equilateral")}
        </g>
      </g>
    </>
  );
};

export default Arc;
