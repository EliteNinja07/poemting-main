import React, { CSSProperties, ReactNode } from "react";
// @ts-ignore
import styles from "./index.module.sass";

const Card = ({
  active,
  children,
  className,
  style,
  disabled = false,
  transparent,
  onClick,
}: {
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  disabled?: boolean;
  transparent?: boolean;
  onClick?: () => void;
}) => {
  return (
    <article
      tabIndex={0}
      className={`${styles.card} ${
        active && !disabled ? styles["active"] : ""
      } ${disabled ? styles["disabled"] : ""} ${className}`}
      style={{
        ...(transparent
          ? {
              background: "none",
            }
          : {}),
        cursor: onClick && !disabled ? "pointer" : "default",
        ...style,
      }}
      onClick={() => onClick && !disabled && onClick()}
    >
      {children}
    </article>
  );
};

export default Card;
