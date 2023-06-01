import { Icon } from "@iconify/react";
import React, { CSSProperties, useEffect, useState } from "react";
import { Pause, Play } from "../../assets/icons";
import { usePromptState } from "../../shared/context/prompts/PromptProvider";
// @ts-ignore
import styles from "./styles.module.sass";

const VideoPlayer = ({ videoUrl }: { videoUrl?: string }) => {
  const { state } = usePromptState();
  const [isPlaying, setPlaying] = useState(false);
  const [currentTimeInSec, setCurrentTimeInSec] = useState(0);
  const [currentTimeInMin, setCurrentTimeInMin] = useState(0);
  const [songDurationInSec, setSongDurationInSec] = useState(0);
  const [songDurationInMin, setSongDurationInMin] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [seekBeforeWidth, setSeekBeforeWidth] = useState<number>(0);
  const [bufferedRange, setBufferRange] = useState<any>(0);
  const [loading, setLoading] = useState(true);

  const video = document.querySelector(
    "video#video-player"
  ) as HTMLVideoElement;

  const togglePlay = () => {
    if (video && songDuration) {
      // video
      if (video?.paused) {
        video?.play();
        setPlaying(true);
      } else {
        video?.pause();
        setPlaying(false);
      }
    }
  };

  const changeProgressBar = (e: any) => {
    let { value } = e.target;
    if (video) {
      setCurrentTime(value / 1000);
      video.currentTime = value / 1000;
    }
  };

  const fullScreenToggle = () => {
    if (video) {
      setFullScreen(!fullScreen);
      video?.requestFullscreen();
    }
  };

  useEffect(() => {
    setSeekBeforeWidth((currentTime / songDuration) * 100);
  }, [currentTime]);

  useEffect(() => {
    if (video) {
      video.onloadeddata = () => {
        setCurrentTimeInSec(video?.currentTime % 60);
        setCurrentTimeInMin((video?.currentTime / 60) % 60);
        setSongDurationInSec(video?.duration % 60);
        setSongDurationInMin((video?.duration / 60) % 60);
        setSongDuration(video?.duration);
        setCurrentTime(video?.currentTime);
        setLoading(false);
      };
      video.ontimeupdate = () => {
        if (video && video?.currentTime) {
          setCurrentTimeInSec(video?.currentTime % 60);
          setCurrentTimeInMin((video?.currentTime / 60) % 60);
          setCurrentTime(video?.currentTime);
          setSeekBeforeWidth((currentTime / songDuration) * 100);
        }
        if (video && video?.duration) {
          setSongDurationInSec(video?.duration % 60);
          setSongDurationInMin((video?.duration / 60) % 60);
          setSongDuration(video?.duration);
          setBufferRange(video?.buffered?.end(video?.buffered?.length - 1));
        }
      };
      video.onended = () => {
        setCurrentTime(0);
        setCurrentTimeInSec(0);
        setCurrentTimeInMin(0);
        setSeekBeforeWidth(0);
        setBufferRange(0);
        setPlaying(false);
      };
    }
  }, [isPlaying, video]);

  useEffect(() => {
    if (video) {
      if (video?.played) {
        setPlaying(true);
      }
      if (video?.paused) {
        setPlaying(false);
      }
    }
  }, [video?.played, video?.paused]);

  const style = {
    "--seek-before-width": seekBeforeWidth + "%",
    "--buffer-before-width": (bufferedRange / songDuration) * 100 + "%",
  } as CSSProperties;

  return (
    <>
      <div
        className={`${styles["video-player"]}`}
        style={{
          ...style,
        }}
      >
        {loading && (
          <div className="flex">
            <p>Loading Video...</p>
          </div>
        )}
        <video
          key={videoUrl ?? state.generatedVideo}
          id="video-player"
          disablePictureInPicture
          controlsList="nodownload"
          onLoad={() => setLoading(false)}
          style={{
            display: loading ? "none" : "block",
          }}
          // controls
        >
          <source
            src={videoUrl ?? state.generatedVideo ?? ""}
            type={"video/mp4"}
          />
          <span>Your Browser does not support this video forma</span>
        </video>
        {!loading && (
          <div className={`${styles["controls"]}`} onClick={togglePlay}>
            <div className={`${styles["top-controls"]}`}></div>
            <div
              className={`${styles["center-controls"]} ${
                !isPlaying ? styles["not-playing"] : ""
              }`}
            >
              <>
                <button title={isPlaying ? "Pause" : "Play"}>
                  {!isPlaying ? (
                    <Play height={80} width={80} />
                  ) : (
                    <Pause height={80} width={80} />
                  )}
                </button>
              </>
            </div>
            <div
              className={`${styles["more-controls"]} ${
                !isPlaying ? styles["not-playing"] : ""
              }`}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`${styles["more-controls-container"]}`}
              >
                <div className={`${styles.bar} ${styles.duration__bar}`}>
                  <input
                    type="range"
                    id="progress"
                    disabled={!video && songDuration}
                    step={0.0001}
                    value={currentTime && currentTime * 1000}
                    max={songDuration && songDuration * 1000}
                    onChange={changeProgressBar}
                  />
                </div>
                <div className="flex-wide">
                  <div className={`${styles["time-controls"]}`}>
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
                    &nbsp;/&nbsp;
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
                  <button
                    className={`${styles["full-screen-toggle"]}`}
                    onClick={fullScreenToggle}
                  >
                    {fullScreen ? (
                      <Icon
                        height={23}
                        width={23}
                        icon={"akar-icons:full-screen"}
                      />
                    ) : (
                      <Icon
                        height={23}
                        width={23}
                        icon={"akar-icons:normal-screen"}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!video?.duration && !loading && (
        <div
          style={{
            marginTop: "2rem",
            color: "red",
            fontSize: "1.2rem",
          }}
        >
          Failed to load video resources
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
