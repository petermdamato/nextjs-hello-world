import React from "react";
import labelConstants from "./labelConstants";
import theme from "./theme";

const LabelOverlay = ({ textPaths, context, displayText = true }) => {
  return (
    <>
      {textPaths.map((textPath, index) => {
        return (
          <g key={"label-" + index} fill={"white"}>
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: 12 }}
            >
              <textPath xlinkHref={`#label-${index}`} startOffset="50%">
                <tspan
                  style={{
                    fontSize: theme.fontSizes.innerLabels,
                    fontFamily: "Lato",
                    display: displayText ? "" : "none",
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
                    fontSize: theme.fontSizes.innerLabels,
                    fontFamily: "Lato",
                    display: displayText ? "" : "none",
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
              id={`label-${index}`}
              d={textPath}
              style={{ fill: "none" }}
            ></path>
          </g>
        );
      })}
    </>
  );
};

export default LabelOverlay;
