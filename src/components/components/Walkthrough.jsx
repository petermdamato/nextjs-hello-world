import React, { useState, useRef, useEffect } from "react";
import "./Walkthrough.css";

const Walkthrough = ({ steps, positions, corner = "lower-right" }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bubbleSize, setBubbleSize] = useState({ width: 200, height: 120 });
  const [hidden, setHidden] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setBubbleSize({
        width: Math.max(bbox.width + 40, 200), // Minimum width of 200
        height: Math.max(bbox.height + 80, 120), // Minimum height of 120
      });
    }
  }, [currentStep, steps]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const endWalkthrough = () => {
    setHidden(true);
  };

  const handleClick = (direction) => {
    if (direction === "prev") {
      prevStep();
    } else if (direction === "next") {
      nextStep();
    } else {
      endWalkthrough();
    }
  };

  const wrapText = (text, maxWidth) => {
    const words = text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = textWidth(currentLine + " " + word);

      if (width <= maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    lines.push(currentLine);
    return lines;
  };

  const textWidth = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "14px sans-serif";
    return context.measureText(text).width;
  };
  const bubbleX = currentStep * 35;
  const bubbleY = 0;
  const bubbleRightX = bubbleSize.width / 2;
  const bubbleBottomY = bubbleY + bubbleSize.height;

  // Coordinates where the rounded border starts on the bottom and right
  const cornerRadius = 16;
  const bubbleBottomRightX = bubbleRightX - cornerRadius;
  const bubbleBottomLeftY = bubbleBottomY - cornerRadius;

  const pathData = `
    M${bubbleBottomRightX + bubbleX},${bubbleBottomY}
    L${positions[currentStep][0]},${positions[currentStep][1]}
    L${bubbleRightX + bubbleX},${bubbleBottomLeftY}
    Z
  `;

  return (
    <g
      className="walkthrough-svg"
      width={500}
      height={600}
      style={{ display: hidden ? "none" : "" }}
    >
      <filter id="shadow" x="0" y="0" width="200%" height="200%">
        <feDropShadow
          dx="2"
          dy="2"
          stdDeviation="1"
          floodColor="#000"
          floodOpacity="0.6"
        />
      </filter>
      <g
        className={`walkthrough ${
          currentStep === steps.length - 1 ? "last-step" : ""
        }`}
      >
        <g transform={`translate(0, 0)`} filter="url(#shadow)">
          <path d={pathData} stroke="#000000" strokeWidth="0" fill="#83A2A2" />
          <rect
            x={bubbleX}
            y="0"
            width={bubbleSize.width}
            height={bubbleSize.height}
            rx="10"
            ry="10"
            fill="#83A2A2"
          />
          {/* <text ref={textRef} x="20" y="40" fontSize="18" fill="#fff">
              {steps[currentStep].text}
            </text> */}
          <g onClick={() => handleClick("")}>
            <path
              transform={`translate(${
                bubbleSize.width - 24 + bubbleX
              },${8}) scale(0.04)`}
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              style={{
                fill: currentStep === 0 ? "white" : "white",
                opacity: currentStep === 0 ? 1 : 1,
              }}
            ></path>
            <rect
              transform={`translate(${bubbleSize.width - 24 + bubbleX},${8})`}
              height={20}
              width={20}
              style={{
                fill: currentStep === 0 ? "transparent" : "transparent",
                opacity: currentStep === 0 ? 1 : 1,
              }}
            ></rect>
          </g>
          <text
            className={"walkthrough-text"}
            ref={textRef}
            x={20 + bubbleX}
            y="30"
            fontSize="14"
            fill="#000000"
          >
            {wrapText(steps[currentStep].text, 300).map((line, index) => (
              <tspan key={index} x={20 + bubbleX} dy="1.2em">
                {line}
              </tspan>
            ))}
          </text>

          <path
            transform={`translate(${bubbleSize.width - 24 + bubbleX},${
              bubbleSize.height - 38
            })`}
            onClick={() => handleClick("next")}
            d="M 0 26 L 13 13 L 0 0 Z Z"
            style={{
              fill: currentStep >= steps.length - 1 ? "white" : "white",
              opacity: currentStep >= steps.length - 1 ? 0.4 : 1,
            }}
          ></path>

          <path
            transform={`translate(${bubbleSize.width - 32 + bubbleX},${
              bubbleSize.height - 38
            })`}
            onClick={() => handleClick("prev")}
            d="M 0 26 L -13 13 L 0 0 Z Z"
            style={{
              fill: currentStep === 0 ? "white" : "white",
              opacity: currentStep === 0 ? 0.4 : 1,
            }}
          ></path>
        </g>
      </g>
      <path
        d="M10,280 L50,250 L10,220 Z M490,280 L450,250 L490,220 Z"
        fill="none"
        stroke="none"
        strokeWidth="0"
        onClick={() => handleClick("prev")}
        style={{ cursor: currentStep === 0 ? "not-allowed" : "pointer" }}
      />
      <path
        d="M490,280 L450,250 L490,220 Z M10,280 L50,250 L10,220 Z"
        fill="none"
        stroke="none"
        strokeWidth="0"
        onClick={() => handleClick("next")}
        style={{
          cursor: currentStep === steps.length - 1 ? "not-allowed" : "pointer",
        }}
      />
    </g>
  );
};

export default Walkthrough;
