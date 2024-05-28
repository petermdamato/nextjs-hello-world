import React, { useState, useEffect, useRef } from "react";
import Orbit from "./Orbit";
import { path } from "d3-path";
import { scaleLinear } from "d3-scale";
import { generateValues, pickQuadrant, anglePicker } from "./../util";
import labelConstants from "./labelConstants";
import theme from "./theme";

const Arcs = ({
  context,
  labels,
  thickness,
  displayText,
  innerRadius,
  width,
  height,
  arcIndex,
  average,
  previous,
  current,
  targetMonth,
  targetYear,
  range,
  ranges,
}) => {
  const fillColors =
    context === "inflation" ? theme.vizColor.inflation : theme.vizColor.rates;
  const [segment, setSegment] = useState(null);
  const [leftRight, setLeftRight] = useState("left");
  const [topBottom, setTopBottom] = useState("top");
  const [closeCall, setCloseCall] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [textWidthLast, setTextWidthLast] = useState(0);
  const textRef = useRef(null);
  const textRefLast = useRef(null);
  const radians = Math.PI / 180;

  const rangeEnd = context === "inflation" ? range : average * 60;

  const rangeStart = average - (rangeEnd - average);

  let radialScale;
  context === "inflation"
    ? (radialScale = scaleLinear()
        .domain([rangeStart, rangeEnd])
        .range([-180, 0]))
    : (radialScale = scaleLinear()
        .domain(
          [
            ranges[3] * -1,
            ranges[2] * -1,
            ranges[1] * -1,
            ranges[0] * -1,
            ranges[0],
            ranges[1],
            ranges[2],
            ranges[3],
          ].map((entry) => entry)
        )
        .range([-180, -152, -124, -96, -84, -56, -28, 0]));

  const radialVal = radialScale(current);
  const radialValPrev = radialScale(previous);

  const thresholds = generateValues(-180, 0, 7).reverse();
  const quadrant = pickQuadrant(thresholds, radialVal);
  // const leftRightPick = findIndices(quadrant[0],thresholds,radialVal)

  useEffect(() => {
    setSegment(quadrant);
    setLeftRight(current > previous ? "right" : "left");
    setTopBottom(
      radialVal > -75 && current > previous
        ? "bottom"
        : radialVal < -135 && current < previous
        ? "bottom"
        : "top"
    );
    setCloseCall(
      (radialVal > -90 &&
        radialVal > radialValPrev &&
        Math.abs(radialVal - radialValPrev) < 1) ||
        (radialVal < -90 &&
          radialVal < radialValPrev &&
          Math.abs(radialVal - radialValPrev) < 1) ||
        (radialVal > -90 &&
          radialVal < radialValPrev &&
          Math.abs(radialVal - radialValPrev) < 14) ||
        (radialVal < -90 &&
          radialVal > radialValPrev &&
          Math.abs(radialVal - radialValPrev) < 14) ||
        Math.abs(radialVal - radialValPrev) < 4
    );
  }, [radialVal]);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.getBoundingClientRect().width;
      setTextWidth(width);
    }
  }, [current]);

  useEffect(() => {
    if (textRefLast.current) {
      const width = textRefLast.current.getBoundingClientRect().width;
      setTextWidthLast(width);
    }
  }, [previous]);

  const numSegments = 7;

  const outerRadius = innerRadius + thickness;

  const radius = (outerRadius + innerRadius) / 2 - 2;

  const arcs = [];
  const arcsReady = [];
  const textPaths = [];

  const segmentAngles = generateValues(-180, 0, 7);

  const currentTextPathGen = path();
  const lastMonthTextPathGen = path();
  const offsetFactor = leftRight === "left" && radialVal > -90 ? 0.99 : 1;
  const offsetAngle =
    leftRight === "left" && radialVal > -90
      ? 0
      : ((textWidth / radius) * 180) / Math.PI;

  // Actual current value of bar, adds in offset
  currentTextPathGen.arc(
    width / 2,
    height,
    radius,
    -180 * (Math.PI / 180),
    (radialScale(current * offsetFactor) + offsetAngle) * (Math.PI / 180)
  );

  const currentPath = currentTextPathGen.toString();

  const offsetAngleLast = ((textWidthLast / radius) * 180) / Math.PI;

  const breakSafeAngle = anglePicker(segmentAngles, radialScale(previous));

  // Actual last's month's value, adds in offset
  if (radialScale(previous) > -92 && radialScale(previous) < -88) {
    // Put logic for extended line here
    lastMonthTextPathGen.arc(
      width / 2,
      height,
      radius,
      -180 * (Math.PI / 180),
      (breakSafeAngle + offsetAngleLast + 2) * (Math.PI / 180)
    );
  } else if (radialScale(previous) >= -88) {
    lastMonthTextPathGen.arc(
      width / 2,
      height,
      radius,
      -180 * (Math.PI / 180),
      (breakSafeAngle + offsetAngleLast + 2) * (Math.PI / 180)
    );
  } else {
    lastMonthTextPathGen.arc(
      width / 2,
      height,
      radius,
      -180 * (Math.PI / 180),
      breakSafeAngle * (Math.PI / 180)
    );
  }

  const lastMonthPath = lastMonthTextPathGen.toString();

  for (let i = 0; i < numSegments; i++) {
    const pathGenerator = path();
    const textPathGen = path();
    let startAngle;
    let endAngle;

    if (i === 3) {
      startAngle =
        radialVal < -90 ? Math.max(radialVal, segmentAngles[i]) : -90;
      endAngle =
        radialVal > -90 ? Math.min(radialVal, segmentAngles[i + 1]) : -90;
    } else {
      startAngle =
        i >= 3 || segmentAngles[i] > radialVal
          ? segmentAngles[i] + 1
          : segment &&
            radialVal < segmentAngles[i + 1] &&
            radialVal > segmentAngles[i + 1] - 1
          ? segmentAngles[i + 1] - 1
          : radialVal;
      endAngle =
        i <= 3 || segmentAngles[i + 1] < radialVal
          ? segmentAngles[i + 1] - 1
          : segment && radialVal < segmentAngles[segment[0]] + 1
          ? segmentAngles[i] + 1
          : radialVal;
    }

    const startXOuter = Math.cos(startAngle * radians) * outerRadius;
    const startYOuter = Math.sin(startAngle * radians) * outerRadius;

    const endXInner = Math.cos(endAngle * radians) * innerRadius;
    const endYInner = Math.sin(endAngle * radians) * innerRadius;

    textPathGen.arc(
      width / 2,
      height,
      330,
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
    arcsReady.push(true);
  }

  return (
    <>
      <g>
        <text
          ref={textRef}
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ opacity: 0 }}
        >
          {current}%
        </text>
      </g>
      <g>
        <text
          ref={textRefLast}
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ opacity: 0 }}
        >
          {previous}%
        </text>
      </g>
      {arcs.map((arcPath, index) => {
        return (
          <g
            key={"arc-" + arcIndex + "-segment-" + index}
            fill={fillColors[index] || "red"}
          >
            <path
              d={arcPath}
              transform={`translate(${width / 2},${height})`}
              style={{
                opacity:
                  index === 3 || (segment && segment.includes(index)) ? 1 : 0,
              }}
            />
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: 12 }}
            >
              <textPath xlinkHref={`#arc-${index}`} startOffset="50%">
                <tspan
                  style={{
                    fontSize: theme.fontSizes.legendArc,
                    display: displayText ? "" : "none",
                    filter: "brightness(0.8)",
                  }}
                  x={0}
                  dy={index === 3 ? 0 : "-1.2em"}
                >
                  {context === "inflation"
                    ? labelConstants.labels.inflation[index].split(" ")[0]
                    : labelConstants.labels.rates[index].split(" ")[0]}
                </tspan>
                <tspan
                  style={{
                    fontSize: theme.fontSizes.legendArc,
                    display: displayText ? "" : "none",
                    filter: "brightness(0.8)",
                  }}
                  x={0}
                  dy={index === 3 ? 0 : "1.2em"}
                >
                  {context === "inflation"
                    ? labelConstants.labels.inflation[index].split(" ")[1]
                    : labelConstants.labels.rates[index].split(" ")[1]}
                </tspan>
              </textPath>
            </text>
            <path
              id={`arc-${index}`}
              d={textPaths[index]}
              style={{ fill: "none" }}
            ></path>

            <path
              id={`arc-curr-${arcIndex}`}
              d={currentPath}
              style={{ fill: "none" }}
            ></path>
            <Orbit
              context={context}
              arcIndex={arcIndex}
              orbitPath={lastMonthPath}
              innerRadius={innerRadius}
              lastMonthValue={previous}
              lastMonthDegree={breakSafeAngle}
              avgDeg={average}
              val={average}
              valG={current}
              radialScale={radialScale}
              transform={`translate(${width / 2},${height})`}
              offset={offsetAngleLast}
              colorText={fillColors[quadrant[0]]}
              leftRight={leftRight}
              topBottom={topBottom}
              closeCall={closeCall}
              radialVal={radialVal}
              radialValPrev={radialValPrev}
              targetMonth={radialScale(targetMonth)}
              targetYear={radialScale(targetYear)}
            />
          </g>
        );
      })}
      <text
        transform={`translate(${110 + (thickness + 5) * arcIndex},${
          height + 8
        }) rotate(-90)`}
        textAnchor="end"
        dominantBaseline="middle"
        style={{
          fontSize: theme.fontSizes.indices,
          opacity: 1,
        }}
      >
        {labels[arcIndex]}
      </text>
    </>
  );
};

export default Arcs;
