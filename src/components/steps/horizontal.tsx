import React from "react";
import { useStepsContext } from "../../shared/context/StepsProvider";
import StepIndicator from "./horizontal-step-indicator";

const HorizontalSteps = () => {
  const { state } = useStepsContext();
  return (
    <div
      className="steps_indicator flex"
      style={{
        width: "100%",
      }}
    >
      {state.steps.map((step, index) => (
        <StepIndicator
          active={step.active}
          done={step.done}
          count={step.position}
          line={state.steps.length - 1 !== index}
          width={
            index < state.steps.length - 1
              ? `calc( 100% - ${60 / state.steps.length}px`
              : 60
          }
          key={step.position}
        />
      ))}
    </div>
  );
};

export default HorizontalSteps;
