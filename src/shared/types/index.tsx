export interface Step {
  position: number;
  title: string;
  description: string;
  done: boolean;
  active: boolean;
}

export interface PromptStateType {
  prompt?: string;
  poem?: string;
  imgPrompt?: string;
  backgroundMusic?: { file: File; url: string | ArrayBuffer | null } | null;
  selectedVoiceId?: string;
  selectedStyleId?: string | null;
  generatedAudio?: {
    audio: string;
    duration: number;
  } | null;
  prevGeneratedAudio?: {
    audio: string;
    duration: number;
  };
  generatedImg?: {
    url: string | ArrayBuffer | null;
    file?: File;
    isUrl: boolean;
  } | null;
  generatedVideo?: string | null;
}

export interface PromptReducerAction {
  type:
    | "ADD_PROMPT"
    | "ADD_POEM"
    | "ADD_IMG_PROMPT"
    | "SELECT_VOICE"
    | "SET_GENERATED_AUDIO"
    | "SET_BACKGROUND_MUSIC"
    | "SET_GENERATED_IMG"
    | "SET_GENERATED_VIDEO"
    | "RESET_POEM";
  payload: PromptStateType;
}

export interface VoiceStyle {
  _id: string;
  style: string;
  audioSample: string;
}

export interface VoiceCardProps {
  id: string;
  gender: string;
  name: string;
  voiceStyles: VoiceStyle[];
  play: boolean;
  handlePlay: (voiceId: string) => void;
  selectVoiceStyle: (src: string) => void;
  handleSelectVoice: (
    selectedVoiceId: string,
    selectedVoiceStyleId: string | null
  ) => void;
}

export interface VoiceType {
  _id: string;
  name: string;
  gender: string;
  audioSample: string;
  styles: VoiceStyle[];
}

export interface LangType {
  _id: string;
  name: string;
}
