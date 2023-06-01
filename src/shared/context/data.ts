import { Step } from "../types";

export const initialSteps: Step[] = [
  {
    position: 1,
    title: "Describe your idea",
    description:
      "Briefly describe your song / greeting card idea and I will generate lyrics or a poem for you",
    active: true,
    done: false,
  },
  {
    position: 2,
    title: "Review Generated words",
    description:
      "Here is what I came up with. You use the regenerate button to try again or go back and refine your prompt idea.",
    active: false,
    done: false,
  },
  {
    position: 3,
    title: "Choose a singing voice",
    description: "Select a voice that will sing your song or recite your poem.",
    active: false,
    done: false,
  },
  {
    position: 4,
    title: "Review Generated Poem",
    description:
      "Here is what I came up with. You use the regenerate button to try again or go back and refine your prompt idea.",
    active: false,
    done: false,
  },
  {
    position: 5,
    title: "Generate Image",
    description:
      "Generate a picture to be used as a cover image for your song.",
    active: false,
    done: false,
  },
  {
    position: 6,
    title: "Review Generated Image",
    description:
      "Here is the picture I came up with. You use the regenerate button to try again or go back and refine your prompt idea.",
    active: false,
    done: false,
  },
  {
    position: 7,
    title: "Review and share generated audio",
    description:
      "Here is the Poem I came up with. You use the regenerate button to try again or go back and refine your prompt idea.",
    active: false,
    done: false,
  },
];
