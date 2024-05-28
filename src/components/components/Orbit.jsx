import React from "react";
import { path } from "d3-path";
import theme from "./theme";

const Orbit = ({
  context,
  valG,
  radialVal,
  radialValPrev,
  transform,
  innerRadius,
  lastMonthValue,
  lastMonthDegree,
  targetMonth,
  targetYear,
  leftRight,
  colorText,
  closeCall,
  topBottom,
}) => {
  const radians = Math.PI / 180;

  const textRadians = lastMonthDegree * radians;
  const textX = innerRadius * Math.cos(textRadians);
  const textY = innerRadius * Math.sin(textRadians);

  // Calculate the position of the circle along the arc using trigonometry
  const circlePosition = (angle) => {
    const radius = innerRadius + 20; // Average of inner and outer radius
    const x = Math.cos(angle * radians) * radius;
    const y = Math.sin(angle * radians) * radius;
    return [x, y];
  };

  // Calculate the position of the circle along the arc using trigonometry
  const circlePositionTextLast = (angle) => {
    const radius = innerRadius; // Average of inner and outer radius
    const x = !closeCall
      ? angle < -135
        ? Math.cos(angle * 1.04 * radians) * (innerRadius + 11)
        : angle < -90
        ? Math.cos(angle * 1.02 * radians) * (innerRadius + 11)
        : angle > -45
        ? Math.cos(angle * 0.97 * radians) * (innerRadius + 2)
        : Math.cos(angle * (leftRight === "left" ? 0.97 : 1.15) * radians) *
          (innerRadius + 11)
      : angle < -135
      ? Math.cos(angle * 1.04 * radians) * (innerRadius + 2)
      : angle < -90
      ? Math.cos(angle * 1.02 * radians) * (innerRadius + 2)
      : angle > -45
      ? Math.cos(angle * 0.97 * radians) * (innerRadius + 2)
      : Math.cos(angle * 0.97 * radians) * (innerRadius + 2);
    const y = !closeCall
      ? angle < -135
        ? Math.sin(angle * 1.05 * radians) * (innerRadius + 11)
        : angle > -45
        ? Math.sin(angle * 1.5 * radians) * (innerRadius + 2)
        : Math.sin(angle * 1 * radians) * (innerRadius + 11)
      : angle < -135
      ? Math.sin(angle * 1.05 * radians) * (innerRadius + 2)
      : angle > -35
      ? Math.sin(angle * (topBottom === "bottom" ? 1.5 : 0.5) * radians) *
        (innerRadius + 2)
      : angle > -55
      ? Math.sin(angle * (topBottom === "bottom" ? 1.5 : 0.9) * radians) *
        (innerRadius + 2)
      : Math.sin(angle * 1 * radians) * (innerRadius + 2);
    return [x, y];
  };

  // Calculate the position of the circle along the arc using trigonometry
  const circlePositionText = (angle) => {
    const radius = innerRadius; // Average of inner and outer radius
    const x = !closeCall
      ? angle < -135
        ? Math.cos(angle * 0.98 * radians) * (innerRadius + 11)
        : angle > -45
        ? Math.cos(angle * 1.1 * radians) * (innerRadius + 10)
        : angle > -90
        ? Math.cos(angle * 0.98 * radians) * (innerRadius + 11)
        : Math.cos(angle * 1.02 * radians) * (innerRadius + 11)
      : angle < -135
      ? Math.cos(angle * 0.98 * radians) * (innerRadius + 11)
      : angle > -45
      ? Math.cos(angle * 1.1 * radians) * (innerRadius + 10)
      : angle > -90
      ? Math.cos(angle * 0.98 * radians) * (innerRadius + 20)
      : Math.cos(angle * 1.02 * radians) * (innerRadius + 20);

    const y = !closeCall
      ? angle > -40
        ? Math.sin(angle * 0.8 * radians) * (innerRadius + 10)
        : Math.sin(angle * radians) * (innerRadius + 11)
      : angle > -40
      ? Math.sin(angle * 0.8 * radians) * (innerRadius + 10)
      : Math.sin(angle * 1 * radians) * (innerRadius + 20);
    return [x, y];
  };
  // Create a new path
  const pR = path();
  const pLeg = path();

  // Define the center coordinates
  const centerX = 0;
  const centerY = 0;

  const angleR = lastMonthDegree * (Math.PI / 180); // Convert angle to radians

  // Define the inner and outer radii
  const outerRadius = innerRadius + 40;

  // Calculate the start and end points of the line segment
  const startXR = centerX + Math.cos(angleR) * innerRadius;
  const startYR = centerY + Math.sin(angleR) * innerRadius;
  const endXR = centerX + Math.cos(angleR) * outerRadius;
  const endYR = centerY + Math.sin(angleR) * outerRadius;

  pR.moveTo(startXR, startYR);
  pR.lineTo(endXR, endYR);

  const lastLinePathData = pR.toString();

  return (
    <>
      {context === "inflation" ? (
        <>
          <path
            d={lastLinePathData}
            transform={transform}
            style={{
              strokeWidth: 2,
              stroke: "#d3d3d3",
              pointerEvents: "none",
            }}
          ></path>

          {/* Below is the one month rate shadow */}
          <text
            x={circlePositionText(radialVal)[0]}
            y={circlePositionText(radialVal)[1]}
            transform={transform}
            style={{
              fontSize: theme.fontSizes.numbers,
              fontWeight: theme.fontWeights.heavy,
              filter: "blur(2px)",
              fill: "white",
              textAnchor: radialVal > -90 ? "start" : "end",
            }}
          >
            {Math.round(valG * 10) / 10 + " %"}
          </text>

          {/* Below is the one month rate */}
          <text
            className="bold-text"
            x={circlePositionText(radialVal)[0]}
            y={circlePositionText(radialVal)[1]}
            transform={transform}
            style={{
              fontSize: theme.fontSizes.numbers,
              fontWeight: theme.fontWeights.heavy,
              fill: colorText,
              filter: "brightness(0.5)",
              textAnchor: radialVal > -90 ? "start" : "end",
            }}
          >
            {Math.round(valG * 10) / 10 + " %"}
          </text>
          {/* Below is the one month rate shadow */}
          <text
            x={circlePositionTextLast(lastMonthDegree)[0]}
            y={circlePositionTextLast(lastMonthDegree)[1]}
            transform={transform}
            style={{
              fontSize: theme.fontSizes.numbers,
              fontWeight: theme.fontWeights.heavy,
              filter: "blur(2px)",
              fill: "white",
              textAnchor: radialValPrev > -90 ? "start" : "end",
            }}
          >
            {Math.round(lastMonthValue * 10) / 10 + " %"}
          </text>

          {/* Below is the one month rate */}
          <text
            x={circlePositionTextLast(lastMonthDegree)[0]}
            y={circlePositionTextLast(lastMonthDegree)[1]}
            transform={transform}
            style={{
              fontSize: theme.fontSizes.numbers,
              fill: theme.fontColors.previousMonth,
              fontWeight: theme.fontWeights.normal,
              textAnchor: radialValPrev > -90 ? "start" : "end",
            }}
          >
            {Math.round(lastMonthValue * 10) / 10 + " %"}
          </text>
        </>
      ) : (
        <>
          <circle
            r={3}
            cx={circlePosition(targetMonth)[0]}
            cy={circlePosition(targetMonth)[1]}
            transform={transform}
            style={{
              fill: theme.circleColors.oneMonth,
              pointerEvents: "none",
            }}
          ></circle>
          <circle
            r={6}
            cx={circlePosition(targetMonth)[0]}
            cy={circlePosition(targetMonth)[1]}
            transform={transform}
            style={{
              fill: "none",
              strokeWidth: "2px",
              stroke: theme.circleColors.oneMonth,
              pointerEvents: "none",
            }}
          ></circle>
          <circle
            r={5}
            cx={circlePosition(targetYear)[0]}
            cy={circlePosition(targetYear)[1]}
            transform={transform}
            style={{
              fill: theme.circleColors.twelveMonth,
              pointerEvents: "none",
            }}
          ></circle>
          <text
            x={circlePositionText(radialVal)[0]}
            y={circlePositionText(radialVal)[1]}
            transform={transform}
            style={{
              fontSize: theme.fontSizes.numbers,
              fontWeight: theme.fontWeights.rates,
              filter: "blur(2px)",
              fill: "white",
              textAnchor: radialVal > -90 ? "start" : "end",
            }}
          >
            {Math.round(valG * 100) / 100 + " %"}
          </text>
          <text
            x={circlePositionText(radialVal)[0]}
            y={
              radialVal > -95 && radialVal < -85
                ? circlePositionText(radialVal)[1] + 8
                : circlePositionText(radialVal)[1]
            }
            transform={transform}
            style={{
              fontSize: theme.fontSizes.numbers,
              fontWeight: theme.fontWeights.rates,
              fill: "black",
              textAnchor: radialVal > -90 ? "start" : "end",
            }}
          >
            {Math.round(valG * 100) / 100 + " %"}
          </text>
        </>
      )}
    </>
  );
};

export default Orbit;
