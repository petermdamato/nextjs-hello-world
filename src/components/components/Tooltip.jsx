import React from "react";
import "./Tooltip.css";

const Tooltip = ({ tooltipText }) => {
  return (
    <div className="question-mark-tooltip-container">
      <div className="question-mark-tooltip">
        <div className="question-mark">?</div>
        <div className="tooltip">{tooltipText}</div>
      </div>
    </div>
  );
};

export default Tooltip;
