import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useReducer,
} from "react";
import { Step } from "../types";
import { initialSteps } from "./data";

interface Props {
  children: ReactNode;
}

const StepsContext = createContext(
  {} as {
    state: { steps: Step[] };
    dispatch: Dispatch<{
      type: "SET_ACTIVE" | "REMOVE_ACTIVE";
      payload: number | string;
    }>;
  }
);

const stepsReducer = (
  state: { steps: Step[] },
  action: {
    type: "SET_ACTIVE" | "REMOVE_ACTIVE";
    payload: number | string;
  }
) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ACTIVE":
      let stepsCopy = [...state.steps];
      // find index
      const activeIndex = stepsCopy.findIndex(
        (step) => step.position === payload
      );

      // set all other steps as inactive
      stepsCopy = stepsCopy.map((step) => {
        return {
          ...step,
          active: false,
          done:
            payload === 7 && step.position === 7
              ? true
              : step.position < payload
              ? true
              : false, // should set for items with index less than active index
        };
      });

      // set previous step as done
      stepsCopy[activeIndex - 1] = {
        ...stepsCopy[activeIndex - 1],
        done: true,
      };

      stepsCopy[activeIndex] = {
        ...stepsCopy[activeIndex],
        active: true,
      };

      return {
        ...state,
        steps: stepsCopy,
      };
    default:
      return state;
  }
};

const StepsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(stepsReducer, {
    steps: initialSteps,
  });
  return (
    <StepsContext.Provider value={{ state, dispatch }}>
      {children}
    </StepsContext.Provider>
  );
};

export default StepsProvider;

export const useStepsContext = () => useContext(StepsContext);
