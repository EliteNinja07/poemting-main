import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Pause, Play } from "../../assets/icons";
import { usePromptState } from "../../shared/context/prompts/PromptProvider";
// @ts-ignore
import styles from "./styles.module.sass";

const AudioPlayer = () => {
  const { state } = usePromptState();
  const [isPlaying, setPlaying] = useState(false);
  const [currentTimeInSec, setCurrentTimeInSec] = useState<number>(0);
  const [currentTimeInMin, setCurrentTimeInMin] = useState<any>(0);
  const [bufferedRange, setBufferRange] = useState<any>(0);
  const [songDurationInSec, setSongDurationInSec] = useState<number>(0);
  const [songDurationInMin, setSongDurationInMin] = useState<any>(0);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [songDuration, setSongDuration] = useState<any>(0);
  const [isBuffering, setBuffering] = useState<any>(false);
  const [seekBeforeWidth, setSeekBeforeWidth] = useState<number>(0);

  const audio = document.querySelector(
    "audio#media-player"
  ) as HTMLAudioElement;

  const togglePlay = () => {
    if (audio && songDuration) {
      // audio
      if (audio.paused) {
        audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    }
  };

  const changeProgressBar = (e: any) => {
    let { value } = e.target;
    setCurrentTime(value / 1000);
    if (audio && audio.src) {
      audio.currentTime = value / 1000;
    }
  };

  useEffect(() => {
    setSeekBeforeWidth((currentTime / songDuration) * 100);
  }, [currentTime]);

  useEffect(() => {
    if (audio) {
      audio.onwaiting = () => {
        setBuffering(true);
      };
      audio.onplaying = () => {
        setBuffering(false);
      };
      audio.onloadeddata = () => {
        setCurrentTimeInSec(audio.currentTime % 60);
        setCurrentTimeInMin((audio.currentTime / 60) % 60);
        setSongDurationInSec(audio.duration % 60);
        setSongDurationInMin((audio.duration / 60) % 60);
        setSongDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };
      audio.ontimeupdate = () => {
        if (audio && audio.currentTime) {
          setCurrentTimeInSec(audio.currentTime % 60);
          setCurrentTimeInMin((audio.currentTime / 60) % 60);
          setCurrentTime(audio.currentTime);
          setSeekBeforeWidth((currentTime / songDuration) * 100);
        }
        if (audio && audio.duration) {
          setSongDurationInSec(audio?.duration % 60);
          setSongDurationInMin((audio?.duration / 60) % 60);
          setSongDuration(audio.duration);
          setBufferRange(audio?.buffered?.end(audio?.buffered?.length - 1));
        }
      };
      audio.onended = () => {
        setCurrentTime(0);
        setCurrentTimeInSec(0);
        setCurrentTimeInMin(0);
        setSeekBeforeWidth(0);
        setBufferRange(0);
        setPlaying(false);
      };
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    if (audio) {
      if (audio.played) {
        setPlaying(true);
      }
      if (audio.paused) {
        setPlaying(false);
      }
    }
  }, [audio?.played, audio?.paused]);

  const style = {
    "--seek-before-width": seekBeforeWidth + "%",
    "--buffer-before-width": (bufferedRange / songDuration) * 100 + "%",
  } as CSSProperties;

  return (
    <div
      style={{
        ...style,
      }}
    >
      {/* hello audio */}
      <div className={`${styles.bar} ${styles.duration__bar}`}>
        <div className={`flex-wide ${styles.duration}`}>
          <div>
            <span>
              {currentTimeInMin < 10
                ? `0${Math.floor(currentTimeInMin)}`
                : Math.floor(currentTimeInMin)}
            </span>
            &nbsp;:&nbsp;
            <span>
              {currentTimeInSec < 10
                ? `0${Math.floor(currentTimeInSec)}`
                : `${Math.floor(currentTimeInSec)}`}
            </span>
          </div>
          <div>
            <span>
              {songDurationInMin < 10
                ? `0${Math.floor(songDurationInMin)}`
                : Math.floor(songDurationInMin)}
            </span>
            &nbsp;:&nbsp;
            <span>
              {songDurationInSec < 10
                ? `0${Math.floor(songDurationInSec)}`
                : `${Math.floor(songDurationInSec)}`}
            </span>
          </div>
        </div>
        <input
          type="range"
          id="progress"
          disabled={!audio && songDuration}
          step={0.0001}
          value={currentTime && currentTime * 1000}
          max={songDuration && songDuration * 1000}
          onChange={changeProgressBar}
        />
      </div>
      <div
        style={{
          margin: "1rem 0 2rem",
        }}
        className={`flex ${styles.icon} ${styles.toggle_play}`}
      >
        <button
          onClick={togglePlay}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          accessKey="Space"
          type="button"
        >
          {isBuffering ? (
            <span className={`flex ${styles.buffer__audio}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : (
            <span title={isPlaying ? "Pause" : "Play"}>
              {!isPlaying ? <Play /> : <Pause />}
            </span>
          )}
        </button>
      </div>
      <audio
        id="media-player"
        src={state.generatedAudio?.audio ?? ""}
        style={{
          display: "none",
        }}
      />
    </div>
  );
};

export default AudioPlayer;
