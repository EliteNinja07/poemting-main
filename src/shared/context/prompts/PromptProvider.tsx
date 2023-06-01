import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useReducer,
} from "react";
import { PromptReducerAction, PromptStateType } from "../../types";
import { promptReducer } from "./promptReducer";

interface Props {
  children: ReactNode;
}

const PromptContext = createContext(
  {} as { state: PromptStateType; dispatch: Dispatch<PromptReducerAction> }
);

const PromptProvider = ({ children }: Props) => {
  const initialState: PromptStateType = {
    prompt: "",
    poem: "",
    imgPrompt: "",
    selectedStyleId: "",
    selectedVoiceId: "",
    generatedAudio: null,
    generatedImg: null,
    backgroundMusic: null,
    generatedVideo: null,
  };
  const [state, dispatch] = useReducer(promptReducer, initialState);

  return (
    <PromptContext.Provider value={{ state, dispatch }}>
      {children}
    </PromptContext.Provider>
  );
};

export default PromptProvider;

export const usePromptState = () => useContext(PromptContext);
