import React from "react";
import { Link, useParams } from "react-router-dom";
import VideoPlayer from "../components/media-player/video";

const PreviewVideo = () => {
  const id = useParams()?.id;
  // @ts-ignore
  const videoUrl = `${import.meta.env?.VITE_API_URL}/videos/${id}.mp4`;
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        maxWidth: "1000px",
        display: "flex",
        padding: "3rem 0",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <VideoPlayer videoUrl={videoUrl} />
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <p
          style={{
            marginBottom: "1.5rem",
          }}
        >
          You like what your seeing?
        </p>
        <Link to="/generate-poem" className="button">
          Create yours
        </Link>
      </div>
    </div>
  );
};

export default PreviewVideo;
