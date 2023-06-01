import React from "react";
import { usePromptState } from "../../shared/context/prompts/PromptProvider";
import Card from "../card";
//@ts-ignore
import styles from "./index.module.sass";

interface Props {
  text: string;
  onClick?: () => void;
  active?: boolean;
  isImg?: boolean;
}

const SuggestionCard = ({ text, onClick, active, isImg }: Props) => {
  const { state, dispatch } = usePromptState();

  return (
    <Card
      onClick={() => {
        if (!onClick)
          dispatch({
            type: "ADD_PROMPT",
            payload: {
              ...state,
              prompt: text,
            },
          });
        onClick && onClick();
      }}
      style={{
        borderRadius: 10,
      }}
      className={`${styles.card}`}
      active={isImg ? active : state.prompt === text}
    >
      <p>{text}</p>
    </Card>
  );
};
export default SuggestionCard;
