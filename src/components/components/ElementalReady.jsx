"use client"; // This is a client component
import React, { useEffect, useState } from "react";
import { path } from "d3-path";
import { generateValues } from "../util";
import { useSpring, animated } from "react-spring";

const value = 4;

const Elemental = ({
  context = "inflation",
  thickness = 40,
  innerRadius = 100,
  width = 500,
  height = 400,
}) => {
  const [drawnArcs, setDrawnArcs] = useState([]);
  const [drawnRects, setDrawnRects] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const radians = Math.PI / 180;
  const fillColors =
    context === "inflation"
      ? [
          "#837C97",
          "#92A7B1",
          "#A0A27E",
          "#FFDA98",
          "#F6B26B",
          "#DD7E6B",
          "#A2525E",
        ]
      : [
          "#4a913c",
          "#77af82",
          "#a9e0db",
          "#c8dfea",
          "#f6d0d0",
          "#dd9298",
          "#a2525e",
        ];

  const numSegments = 7;

  const outerRadius = innerRadius + thickness;

  const segmentAngles = generateValues(-180, 0, 7);

  //   const startXOrbit =
  //     Math.cos((avgDeg < redDeg ? avgDeg : redDeg) * radians) *
  //     (outerRadius - innerRadius + 5);
  //   const startYOrbit =
  //     Math.sin((avgDeg < redDeg ? avgDeg : redDeg) * radians) *
  //     (outerRadius - innerRadius + 5);

  //   const endXOrbit =
  //     Math.cos((avgDeg > redDeg ? avgDeg : redDeg) * radians) *
  //     (outerRadius - innerRadius - 5);
  //   const endYOrbit =
  //     Math.sin((avgDeg > redDeg ? avgDeg : redDeg) * radians) *
  //     (outerRadius - innerRadius - 5);

  //   const orbitPathGen = path();

  //   orbitPathGen.moveTo(startXOrbit, startYOrbit);
  //   orbitPathGen.arc(
  //     0,
  //     0,
  //     innerRadius + thickness / 2 + 2,
  //     (avgDeg < redDeg ? avgDeg : redDeg) * radians,
  //     (avgDeg > redDeg ? avgDeg : redDeg) * radians
  //   );
  //   orbitPathGen.lineTo(endXOrbit, endYOrbit);
  //   orbitPathGen.arc(
  //     0,
  //     0,
  //     innerRadius + thickness / 2 - 2,
  //     (avgDeg > redDeg ? avgDeg : redDeg) * radians,
  //     (avgDeg < redDeg ? avgDeg : redDeg) * radians,
  //     true
  //   );
  //   orbitPathGen.closePath();

  //   const orbitPath = orbitPathGen.toString();
  useEffect(() => {
    const arcs = [];
    for (let i = 0; i < numSegments; i++) {
      const pathGenerator = path();

      const startAngle = segmentAngles[i];
      const endAngle = segmentAngles[i + 1];

      const startXOuter = Math.cos(startAngle * radians) * outerRadius;
      const startYOuter = Math.sin(startAngle * radians) * outerRadius;

      const endXInner = Math.cos(endAngle * radians) * innerRadius;
      const endYInner = Math.sin(endAngle * radians) * innerRadius;

      const endXOuter = Math.cos(endAngle * radians) * outerRadius;
      const endYOuter = Math.sin(endAngle * radians) * outerRadius;

      pathGenerator.moveTo(startXOuter, startYOuter);
      if (i === 6) {
        pathGenerator.arc(
          0,
          0,
          outerRadius,
          startAngle * radians,
          (endAngle - 8) * radians
        );
      } else {
        pathGenerator.arc(
          0,
          0,
          outerRadius,
          startAngle * radians,
          endAngle * radians
        );
      }
      if (i === 6) {
        pathGenerator.lineTo(endXOuter, endYOuter - 10);
        pathGenerator.quadraticCurveTo(
          endXOuter,
          endYOuter,
          endXOuter - 10,
          endYOuter
        );
        pathGenerator.lineTo(endXInner + 10, endYInner);
        pathGenerator.quadraticCurveTo(
          endXInner,
          endYInner,
          endXInner,
          endYInner - 10
        );
        pathGenerator.arc(
          0,
          0,
          innerRadius,
          (endAngle - 12) * radians,
          startAngle * radians,
          true
        );
      } else {
        pathGenerator.lineTo(endXInner, endYInner);
        pathGenerator.arc(
          0,
          0,
          innerRadius,
          endAngle * radians,
          startAngle * radians,
          true
        );
      }

      pathGenerator.closePath();

      arcs.push(pathGenerator.toString());
    }
    setDrawnArcs(arcs);
    const rects = [];
    for (let i = 0; i < numSegments; i++) {
      if (i < 3) {
        const barWidth = (outerRadius * 2) / 19;
        const barHeight = thickness;
        const rectPathGenerator = path();

        rectPathGenerator.moveTo(-outerRadius + barWidth * 3 * i, 0);
        rectPathGenerator.lineTo(-outerRadius + barWidth * 3 * i, -barHeight);
        rectPathGenerator.lineTo(
          -outerRadius + barWidth * 3 * (i + 1),
          -barHeight
        );
        rectPathGenerator.lineTo(-outerRadius + barWidth * 3 * (i + 1), 0);

        rectPathGenerator.closePath();
        rects.push(rectPathGenerator.toString());
      } else if (i === 3) {
        const barWidth = (outerRadius * 2) / 19;
        const barHeight = thickness;
        const rectPathGenerator = path();

        rectPathGenerator.moveTo(-outerRadius + barWidth * 3 * i, 0);
        rectPathGenerator.lineTo(-outerRadius + barWidth * 3 * i, -barHeight);
        rectPathGenerator.lineTo(
          -outerRadius + barWidth * 3 * i + barWidth,
          -barHeight
        );
        rectPathGenerator.lineTo(-outerRadius + barWidth * 3 * i + barWidth, 0);

        rectPathGenerator.closePath();
        rects.push(rectPathGenerator.toString());
      } else if (i > 3) {
        const barWidth = (outerRadius * 2) / 19;
        const barHeight = thickness;
        const rectPathGenerator = path();

        rectPathGenerator.moveTo(
          -outerRadius + barWidth * 3 * (i - 1) + barWidth,
          0
        );
        rectPathGenerator.lineTo(
          -outerRadius + barWidth * 3 * (i - 1) + barWidth,
          -barHeight
        );
        rectPathGenerator.lineTo(
          -outerRadius + barWidth * 3 * i + barWidth,
          -barHeight
        );
        rectPathGenerator.lineTo(-outerRadius + barWidth * 3 * i + barWidth, 0);

        rectPathGenerator.closePath();
        rects.push(rectPathGenerator.toString());
      }
    }
    setDrawnRects(rects);
  }, [numSegments]);

  return (
    <>
      {drawnArcs.map((arcPath, index) => {
        if (index >= 0) {
          return (
            <g key={"arc-seg" + index} fill={fillColors[index]}>
              <path
                d={isClicked ? drawnArcs[index] : drawnRects[index]}
                transform={`translate(${width / 2},${height})`}
                style={{ opacity: 1 }}
              />
            </g>
          );
        }
      })}

      <rect
        width="100"
        height="100"
        fill="black"
        onClick={() => setIsClicked(!isClicked)}
      />
    </>
  );
};

export default Elemental;

// {drawnArcs.map((arcPath, index) => {
//   if (index >= 0) {
//     return (
//       <g key={"arc-seg" + index} fill={fillColors[index]}>
//         <path
//           d={arcPath}
//           transform={`translate(${width / 2},${height})`}
//           style={{ opacity: 1 }}
//         />
//       </g>
//     );
//   }
// })}

// {drawnArcs.map((rectPath, index) => {
//   if (index >= 0) {
//     return (
//       <g key={"arc-seg" + index} fill={fillColors[index]}>
//         <path
//           d={drawnRects[index]}
//           transform={`translate(${width / 2},${height})`}
//           style={{ opacity: 1 }}
//         />
//       </g>
//     );
//   }
// })}
