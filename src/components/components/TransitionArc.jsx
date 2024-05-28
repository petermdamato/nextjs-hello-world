"use client"; // This is a client component

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { interpolate } from "flubber"; // ES6
import { generateValues, pickQuadrant, anglePicker } from "./../util";
import theme from "./theme";

const path1 =
  "M-140,-1.7145055188062946e-14A140,140,0,1,1,140,0L100,0A100,100,0,1,0,-100,-1.2246467991473532e-14Z";
const path2 = "M-140,0L-140,-40L140,-40L140,0Z";

const thresholds = generateValues(-180, 0, 7);

const TransitionArc = ({ width = 300, height = 200 }) => {
  const [clicked, setClicked] = useState(false);
  const svgRef = useRef(null);
  const arcs = [];
  thresholds.forEach((threshold, index) => {
    if (index < thresholds.length - 1) {
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(width / 2 - 10)
        .startAngle((thresholds[index] + 90) * (Math.PI / 180)) // Convert degrees to radians
        .endAngle((thresholds[index + 1] + 90) * (Math.PI / 180)); // Convert degrees to radians
      // Generate the path data
      const pathData = arc();
      arcs.push(pathData);
    }
  });
  const rects = [];
  thresholds.forEach((threshold, index) => {
    if (index < thresholds.length - 1) {
      const rectPath = d3.path();

      if (index < 3) {
        rectPath.moveTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * index,
          -40
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index + 1),
          -40
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index + 1),
          0
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * index,
          0
        );
      } else if (index === 3) {
        rectPath.moveTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * index,
          -40
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index + 1 / 3),
          -40
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index + 1 / 3),
          0
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * index,
          0
        );
      } else {
        rectPath.moveTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index - 2 / 3),
          -40
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index + 1 / 3),
          -40
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index + 1 / 3),
          0
        );
        rectPath.lineTo(
          (width / 2 - 10) * -1 + ((width - 20) / 19) * 3 * (index - 2 / 3),
          0
        );
      }

      rectPath.closePath();
      rects.push(rectPath.toString());
    }
  });

  const arc2 = d3
    .arc()
    .innerRadius(0)
    .outerRadius(200)
    .startAngle(20 * (Math.PI / 180)) // Convert degrees to radians
    .endAngle(90 * (Math.PI / 180)); // Convert degrees to radians

  const pathData2 = arc2();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous contents
    svg.selectAll("*").remove();
    var interpolator = interpolate(path1, path2);
    var interpolatorMask = interpolate(arcs[0], pathData2);

    // May want to iterate over an array over path segments, with an arc underneath each mask

    // const mask = svg
    //   .append("g")
    //   // .append("defs")
    //   // .append("mask")
    //   .attr("transform", "translate(240,140)")
    //   .append("path")
    //   .classed("animated-", true)
    //   .attr("d", rects[0]);
    // // .attr("fill", "white");
    const pathBackground = svg
      .append("g")
      .attr("transform", "translate(240,140)")
      .append("path")
      .classed("animated-path", true)
      .attr("d", path1)
      .attr("fill", theme.vizColor.inflation[0]);

    arcs.forEach((entry, index) => {
      const mask = svg
        .append("defs")
        .append("mask")
        .attr("id", "arc-mask-" + index)
        .attr("transform", "translate(240,140)")
        .append("path")
        .attr("class", "animated-mask animated-mask-" + index)
        .attr("d", arcs[index])
        .attr("fill", "white");

      const path = svg
        .append("g")
        .attr("transform", "translate(240,140)")
        .append("path")
        .classed("animated-path", true)
        .attr("d", path1)
        .attr("fill", theme.vizColor.inflation[index])
        .attr("mask", "url(#arc-mask-" + index + ")");
    });
  }, [width, height]);

  // On change to clicked, you interpolate the paths // Can update by iterating over the maskes
  useEffect(() => {
    d3.selectAll(".animated-path").on("click", (d) => {
      setClicked(!clicked);
    });
    arcs.forEach((segment, index) => {
      d3.select(".animated-mask-" + index)
        .transition()
        .delay(clicked ? 10 : 80)
        .duration(400)
        .attrTween("d", () => {
          return clicked
            ? interpolate(rects[index], arcs[index])
            : interpolate(arcs[index], rects[index]);
        });
    });

    d3.selectAll(".animated-path")
      .transition()
      .delay(clicked ? 80 : 10)
      .duration(400)
      .attrTween("d", function () {
        return clicked ? interpolate(path2, path1) : interpolate(path1, path2);
      });
  }, [clicked]);

  return <svg ref={svgRef} width={800} height={500}></svg>;
};

export default TransitionArc;
