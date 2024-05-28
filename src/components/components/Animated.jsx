"use client"; // This is a client component

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatedSVG = () => {
  const [isClicked, setIsClicked] = useState(false);

  // Define the two SVG paths
  const path1 = "M50,0 L100,100 L0,100 Z";
  const path2 = "M0,0 L100,0 L50,100 Z";

  // Define spring animation
  const { d } = useSpring({
    d: isClicked ? path2 : path1,
    config: { duration: 500 },
  });

  return (
    <svg width="100" height="100">
      <animated.path d={d} fill="blue" />
      <rect
        width="100"
        height="100"
        fill="transparent"
        onClick={() => setIsClicked(!isClicked)}
      />
    </svg>
  );
};

export default AnimatedSVG;
