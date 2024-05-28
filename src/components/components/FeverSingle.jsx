import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import theme from "./theme";

const Fever = ({ data }) => {
  const svgRef = useRef();
  const keys = Object.keys(data[0]).filter(
    (key) => key.includes("change") && key !== "date"
  );

  useEffect(() => {
    // Set up dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Parse the date / time
    const parseDate = d3.timeParse("%Y-%m-%d");

    const formattedData = data.map((d) => {
      const formattedEntry = {
        date: parseDate(d.date),
      };

      keys.forEach((key) => {
        formattedEntry[key] = +d[key];
      });

      return formattedEntry;
    });

    // Set up scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(formattedData, (d) => d.date))
      .range([0, width]);

    const y = d3.scaleLinear().domain([-15, 30]).nice().range([height, 0]);

    // Line generator function
    const createLine = (data, valueKey) => {
      // Format the data
      const formattedData = data.map((d) => ({
        date: parseDate(d.date),
        value: d[valueKey],
      }));

      // Set the domain for scales
      x.domain(d3.extent(formattedData, (d) => d.date));

      // Create the line generator
      const line = d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.value));

      // Return the line path
      return line(formattedData);
    };

    // Set up line generator
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    // Select the SVG element and clear previous contents
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Append the group element and apply the margins
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add the X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add the Y axis
    g.append("g").call(d3.axisLeft(y).tickFormat((d) => d + "%"));

    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "40%")
      .attr("x2", "0%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 1);

    const mask = defs
      .append("mask")
      .attr("id", "mask")
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#gradient)");

    const gradient2 = defs
      .append("linearGradient")
      .attr("id", "gradient2")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "60%");

    gradient2
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 1);

    gradient2
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);

    const mask2 = defs
      .append("mask")
      .attr("id", "mask2")
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#gradient2)");
    // // Add the line path
    // g.append("path")
    //   .datum(formattedData)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 3)
    //   .attr("d", line);
    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", 3)
      .attr("d", createLine(data, keys[1]));

    g.append("path")
      .attr("fill", "none")
      .attr("stroke", theme.vizColor.fever[7])
      .attr("stroke-width", 3)
      .attr("d", createLine(data, keys[1]))
      .attr("mask", "url(#mask)");
    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "#6f90be")
      .attr("stroke-width", 3)
      .attr("d", createLine(data, keys[1]))
      .attr("mask", "url(#mask2)");
  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default Fever;
