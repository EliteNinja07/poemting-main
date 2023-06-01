import React, { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Pause, Play } from "../../assets/icons";
//@ts-ignore
import styles from "./index.module.sass";
import SelectItem from "../selectItem";
import { VoiceCardProps } from "../../shared/types";
import Card from "../card";

const VoiceCard = ({
  id,
  gender,
  name,
  voiceStyles,
  play,
  handlePlay,
  selectVoiceStyle,
  handleSelectVoice,
}: VoiceCardProps) => {
  const [styleId, setStyleId] = useState<string | null>(null);
  const [styleAudio, setStyleAudio] = useState("");
  const [getAudioParams, setGetAudioParams] = useState({ _id: "" });

  useEffect(() => {
    const getVoiceStyle = voiceStyles.find(
      (voiceStyle) => voiceStyle._id === styleId
    );
    setStyleAudio(getVoiceStyle?.audioSample ? getVoiceStyle?.audioSample : "");
  }, [styleId]);

  return (
    <div
      className={`${styles.container} flex`}
      onClick={() => handleSelectVoice(id, styleId)}
    >
      <div className={`${styles.metadata} flex-column`}>
        <p>{gender}</p>
        <h4>{name}</h4>
        {voiceStyles.length > 0 && (
          <div className={`${styles.voice_styles} flex`}>
            Select Style:{" "}
            <Select.Root
              onValueChange={(value) => {
                setStyleId(value);
                selectVoiceStyle(styleAudio);
              }}
            >
              <Select.Trigger
                className={`${styles.select_trigger} flex reset_button`}
                aria-label="Voice Style"
              >
                <Select.Value placeholder="Select" />
                <Select.Icon className={`${styles.select_icon}`}>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  className={`${styles.select_content}`}
                  position="popper"
                >
                  <Select.ScrollUpButton className="select_scroll_button">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="select_viewport">
                    {voiceStyles.map((voiceStyle) => (
                      <SelectItem value={voiceStyle._id} key={voiceStyle._id}>
                        {voiceStyle.style}
                      </SelectItem>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton className="select_scroll_button">
                    <ChevronDownIcon />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        )}
      </div>

      <button
        className={`${styles.icon} flex`}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          handlePlay(id);
        }}
      >
        {play ? <Pause /> : <Play />}
      </button>
    </div>
  );
};

export default VoiceCard;
