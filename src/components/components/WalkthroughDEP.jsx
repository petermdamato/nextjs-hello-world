import React, { useState } from "react";
import "./Walkthrough.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Walkthrough = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hidden, setHidden] = useState(false);

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

  return (
    <div
      className={`walkthrough`}
      style={{
        display: hidden ? "none" : "",
        transform:
          currentStep === 0
            ? "translate(-180px,100px)"
            : currentStep === 1
            ? "translate(10px,-180px)"
            : currentStep === 2
            ? "translate(0px,-180px)"
            : currentStep === 3
            ? "translate(-100px,-80px)"
            : currentStep === 4
            ? "translate(100px,-280px)"
            : "",
      }}
    >
      <div
        className="triangle triangle-left"
        style={{ display: steps[currentStep].tail !== "left" ? "none" : "" }}
      ></div>

      <div>
        <div
          className="triangle triangle-top"
          style={{ display: steps[currentStep].tail !== "top" ? "none" : "" }}
        ></div>
        <div className={`walkthrough-bubble`}>
          <button onClick={endWalkthrough} className="walkthrough-button-close">
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          <p>{steps[currentStep].text}</p>
          <div className="group">
            {currentStep > 0 ? (
              <button onClick={prevStep} className="walkthrough-button">
                <FontAwesomeIcon icon={faCaretLeft} size="2x" />
              </button>
            ) : (
              <button
                onClick={prevStep}
                className="walkthrough-button disabled"
              >
                <FontAwesomeIcon icon={faCaretLeft} size="2x" />
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button onClick={nextStep} className="walkthrough-button">
                <FontAwesomeIcon icon={faCaretRight} size="2x" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="walkthrough-button disabled"
              >
                <FontAwesomeIcon icon={faCaretRight} size="2x" />
              </button>
            )}
          </div>
        </div>
        <div
          className="triangle triangle-bottom"
          style={{
            display: steps[currentStep].tail !== "bottom" ? "none" : "",
          }}
        ></div>
      </div>

      <div
        className="triangle triangle-right"
        style={{ display: steps[currentStep].tail !== "right" ? "none" : "" }}
      ></div>
    </div>
  );
};

export default Walkthrough;
