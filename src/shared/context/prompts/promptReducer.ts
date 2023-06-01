import { PromptReducerAction, PromptStateType } from "../../types";

export const promptReducer = (
  state: PromptStateType,
  action: PromptReducerAction
) => {
  const { type, payload } = action;
  const { prompt, poem } = payload;
  let updatedState: PromptStateType;

  switch (type) {
    case "ADD_PROMPT":
      updatedState = { ...state, prompt };
      return updatedState;
    case "ADD_POEM":
      updatedState = { ...state, poem };
      return updatedState;
    case "ADD_IMG_PROMPT":
      return {
        ...state,
        imgPrompt: payload.imgPrompt,
      };
    case "SELECT_VOICE":
      return {
        ...state,
        selectedVoiceId: payload.selectedVoiceId,
        selectedStyleId: payload.selectedStyleId,
      };
    case "SET_GENERATED_AUDIO":
      return {
        ...state,
        generatedAudio: payload.generatedAudio,
        prevGeneratedAudio: payload.prevGeneratedAudio,
      };
    case "SET_GENERATED_IMG":
      return {
        ...state,
        generatedImg: payload.generatedImg,
      };
    case "SET_GENERATED_VIDEO":
      return {
        ...state,
        generatedVideo: payload.generatedVideo,
      };
    case "SET_BACKGROUND_MUSIC":
      return {
        ...state,
        backgroundMusic: payload.backgroundMusic,
      };
    case "RESET_POEM":
      return {
        prompt: "",
        poem: "",
        imgPrompt: "",
        selectedStyleId: "",
        backgroundMusic: null,
        selectedVoiceId: "",
        generatedAudio: null,
        generatedImg: null,
        generatedVideo: null,
      };
    default:
      return state;
  }
};
