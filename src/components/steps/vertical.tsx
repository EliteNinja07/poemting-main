import React from "react";
import { useStepsContext } from "../../shared/context/StepsProvider";
import VerticalStepindicator from "./vertical-step-indicator";

const VerticalSteps = () => {
  const { state } = useStepsContext();
  return (
    <div className="steps_indicator flex flex-column">
      {state.steps.map((step) => (
        <VerticalStepindicator step={step} key={step.position} />
      ))}
    </div>
  );
};

export default VerticalSteps;
