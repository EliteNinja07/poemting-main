import React from "react";
import { Check } from "../../../assets/icons";
//@ts-ignore
import styles from "./index.module.sass";

interface Props {
  count: number;
  line?: boolean;
  active?: boolean;
  done?: boolean;
  width?: number | string;
}
const StepIndicator = ({ count, line, active, done, width }: Props) => {
  return (
    <div
      className={`${styles.step} ${done && styles.active}`}
      style={{
        width: width ?? "100%",
      }}
    >
      {done ? (
        <Check />
      ) : (
        <p className={`${styles.step_count} ${active && styles.active}`}>
          {count}
        </p>
      )}
      <div
        className={`${line && styles.step_line} ${
          (active || done) && styles.active
        }`}
      ></div>
    </div>
  );
};

export default StepIndicator;
