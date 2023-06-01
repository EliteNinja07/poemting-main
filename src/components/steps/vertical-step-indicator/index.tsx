import React from "react";
import { Step } from "../../../shared/types";
import Card from "../../card";
import StepIndicator from "../horizontal-step-indicator";

const HorizontalStepIndicator = ({ step }: { step: Step }) => {
  return (
    <Card
      active={step.active}
      transparent
      className="flex-raw"
      style={{
        width: "100%",
        marginBottom: "1rem",
        maxWidth: 545,
      }}
      disabled={!step.active && !step.done}
    >
      <StepIndicator
        count={step.position}
        active={step.active}
        done={step.done}
        width={42}
      />
      <div
        style={{
          width: "calc(100% - 60px)",
        }}
      >
        <h3
          style={{
            marginBottom: ".5rem",
          }}
        >
          {step.title}
        </h3>
        <p>{step.description}</p>
      </div>
    </Card>
  );
};

export default HorizontalStepIndicator;
