import React, { useState } from "react";
import LabelsOverlay from "./LabelsOverlay";
import { path } from "d3-path";
import { scaleLinear } from "d3-scale";
import { generateValues, placeWalkthroughFeatures } from "../util";
import theme from "./theme";
import Walkthrough from "./Walkthrough";
import labelConstants from "./labelConstants.js";

const starEightPoints =
  "M50 0L57.3086 32.3555L85.3553 14.6447L67.6445 42.6914L100 50L67.6445 57.3086L85.3553 85.3553L57.3086 67.6445L50 100L42.6914 67.6445L14.6447 85.3553L32.3555 57.3086L0 50L32.3555 42.6914L14.6447 14.6447L42.6914 32.3555L50 0Z";
const starFourPoints =
  "M50 0L63.5045 36.4955L100 50L63.5045 63.5045L50 100L36.4955 63.5045L0 50L36.4955 36.4955L50 0Z";
const ArcWithLabels = ({
  context,
  thickness,
  innerRadius,
  width,
  height,
  arcIndex,
  current,
  previous,
  target_month,
  target_year,
  ranges,
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

  const rangeEnd = ranges[3];

  const rangeStart = ranges[3] * -1;

  const radialScale = scaleLinear()
    .domain([rangeStart, rangeEnd])
    .range([-180, 0]);

  const radialScaleTriangle = scaleLinear()
    .domain([rangeStart, rangeEnd])
    .range([-90, 90]);

  const radialVal = radialScale(current);
  const radialValPrev = radialScale(previous);
  const radialValTargetYear = radialScale(target_year);
  const radialValTargetMonth = radialScale(target_month);

  const triangleValPrev = radialScaleTriangle(previous);
  const triangleValCurr = radialScaleTriangle(current);
  const triangleValTargetYear = radialScaleTriangle(target_year);
  const triangleValTargetMonth = radialScaleTriangle(target_month);
  const numSegments = 7;

  const outerRadius = innerRadius + thickness;

  const arcs = [];
  const textPaths = [];

  const segmentAngles = generateValues(-180, 0, 7);

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

    if (i === 3) {
      textPathGen.arc(
        width / 2,
        height,
        innerRadius + thickness / 2,
        segmentAngles[i] * (Math.PI / 180),
        segmentAngles[i + 1] * (Math.PI / 180)
      );
    } else {
      textPathGen.arc(
        width / 2,
        height,
        innerRadius + thickness / 2 - 8,
        segmentAngles[i] * (Math.PI / 180),
        segmentAngles[i + 1] * (Math.PI / 180)
      );
    }

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
      <LabelsOverlay textPaths={textPaths} />
      <g
        key={"triangle-previous"}
        fill={"grey"}
        transform={`translate(${
          width / 2
        },${height}) rotate(${triangleValCurr})`}
      >
        <g transform={`translate(${0},${-24})`}>
          {TrianglePath(
            0,
            innerRadius * -1 + thickness / 2 - 4,
            16,
            16,
            "equilateral"
          )}
        </g>
      </g>
      <g
        key={"star-four"}
        transform={`translate(${
          width / 2
        },${height}) rotate(${triangleValTargetMonth})`}
      >
        <g transform={`translate(${0},${innerRadius * -1 + 10})`}>
          <g transform={`translate(${-11},${-10}) scale(0.2)`}>
            <path d={starFourPoints} fill="#480000" />
          </g>
          {/* <circle cy={0} cx={0} r={10} fill="red" /> */}
        </g>
      </g>
      <g
        key={"star-eight"}
        transform={`translate(${
          width / 2
        },${height}) rotate(${triangleValTargetYear})`}
      >
        <g transform={`translate(${0},${innerRadius * -1 + 10})`}>
          <g transform={`translate(${-11},${-10}) scale(0.2)`}>
            <path d={starEightPoints} fill="#480000" />
          </g>
          {/* <circle cy={0} cx={0} r={10} fill="red" /> */}
        </g>
      </g>
      <g
        key={"triangle-current"}
        fill={"black"}
        transform={`translate(${
          width / 2
        },${height}) rotate(${triangleValCurr})`}
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
        <text style={{ fontFamily: "Lato" }}>{current + "%"}</text>
      </g>
      <Walkthrough
        steps={labelConstants.walkthrough}
        positions={[
          [width / 2 - 20, height - innerRadius / 2],
          placeWalkthroughFeatures(radialVal, innerRadius, width, height),
          placeWalkthroughFeatures(
            radialValTargetMonth,
            innerRadius,
            width,
            height
          ),
          placeWalkthroughFeatures(
            radialValTargetYear,
            innerRadius,
            width,
            height
          ),
          [width / 2, 0],
        ]}
        width={width}
        height={height}
        innerRadius={innerRadius}
      />
    </>
  );
};

export default ArcWithLabels;
