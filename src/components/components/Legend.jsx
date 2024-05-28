import React from "react";
import labelConstants from "./labelConstants";
import theme from "./theme";

const textStyleLast = {
  fontSize: theme.fontSizes.legendLower,
  fill: theme.fontColors.previousMonth,
};
const textStyle = {
  fontSize: theme.fontSizes.legendLower,
  fontWeight: theme.fontWeights.heavy,
};

const Legend = ({ context, hoveredIndex, width, height }) => {
  return (
    <g transform={`translate(${width / 2 + 100},${height})`}>
      {context === "inflation" ? (
        <>
          {/* Current month level */}
          <text x="12" y="34" style={{ ...textStyle }}>
            {labelConstants.labels.legend.inflation[0]}
          </text>

          <text x="12" y="54" style={{ ...textStyleLast }}>
            {labelConstants.labels.legend.inflation[1]}
          </text>
        </>
      ) : (
        <>
          {/* Current month level */}
          <circle
            r={5}
            cx={0}
            cy={30}
            style={{
              fill: theme.circleColors.twelveMonth,
              pointerEvents: "none",
            }}
          ></circle>
          <text x="12" y="34" style={{ ...textStyle }}>
            {labelConstants.labels.legend.rates[0]}
          </text>
          <circle
            r={3}
            cx={0}
            cy={50}
            style={{ fill: theme.circleColors.oneMonth, pointerEvents: "none" }}
          ></circle>
          <circle
            r={6}
            cx={0}
            cy={50}
            style={{
              fill: "none",
              strokeWidth: "2px",
              stroke: theme.circleColors.oneMonth,
              pointerEvents: "none",
            }}
          ></circle>
          <text x="12" y="54" style={{ ...textStyle }}>
            {labelConstants.labels.legend.rates[1]}
          </text>
        </>
      )}
    </g>
  );
};

export default Legend;
