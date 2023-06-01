import React, { useEffect, useState } from "react";
import { usePromptState } from "../../shared/context/prompts/PromptProvider";
import { useStepsContext } from "../../shared/context/StepsProvider";
import { useGenerateVideo } from "../../shared/hooks/useApi";
import { generateImage } from "../../shared/utils/apis";

const StepSix = () => {
  const { dispatch } = useStepsContext();
  const { state, dispatch: promptDispatch } = usePromptState();
  const {
    mutateAsync,
    data,
    isLoading,
    error: videoError,
  } = useGenerateVideo();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(
    state.generatedImg?.file ? state.generatedImg : null
  );
  const [generatedImage, setGeneratedImage] = useState(
    !state.generatedImg?.file ? state.generatedImg : null
  );

  const generate = async () => {
    setLoading(true);
    setError("");
    const data: any = await generateImage(state.imgPrompt ?? "");
    if (typeof data === "string") {
      setError(data);
    }
    if (data?.length > 0 && typeof data === "object") {
      setGeneratedImage({
        ...data[0],
        isUrl: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (fileData) {
      promptDispatch({
        type: "SET_GENERATED_IMG",
        payload: {
          generatedImg: fileData,
        },
      });
    }
  }, [fileData]);

  useEffect(() => {
    if (generatedImage) {
      promptDispatch({
        type: "SET_GENERATED_IMG",
        payload: {
          generatedImg: generatedImage,
        },
      });
    }
  }, [generateImage]);

  const generateVideo = async () => {
    // if (
    //   state.generatedVideo &&
    //   state.generatedAudio === state.prevGeneratedAudio &&
    //   state.generatedImg &&
    //   ((!generatedImage?.url && state.generatedImg?.url === fileData?.url) ||
    //     (!fileData?.url && state.generatedImg?.url === generatedImage?.url))
    // ) {
    //   dispatch({
    //     type: "SET_ACTIVE",
    //     payload: 7,
    //   });
    //   return;
    // }
    await mutateAsync({
      imageLink: state.generatedImg?.isUrl
        ? state.generatedImg?.url?.toString()
        : "",
      imageFile: state.generatedImg?.file,
      audioLink: state.generatedAudio?.audio ?? "",
      backgroundMusicFile: state.backgroundMusic?.file,
    });
  };

  useEffect(() => {
    if (data) {
      promptDispatch({
        type: "SET_GENERATED_VIDEO",
        payload: {
          generatedVideo: data?.url,
        },
      });
      dispatch({
        type: "SET_ACTIVE",
        payload: 7,
      });
    }
  }, [data]);

  return (
    <div>
      <section className="step_header">
        <h3>Review Generated Image</h3>
        <p>
          Here is the picture I came up with. You use the regenerate button to
          try again or go back and refine your prompt idea.
        </p>
      </section>
      <section className="image_container">
        {/* preview image */}
        <div
          className="flex"
          style={{
            width: "100%",
          }}
        >
          {state.generatedImg && (
            <div
              style={{
                height: "auto",
                width: "100%",
                background: "#F9FAFB",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "auto",
                }}
                src={state.generatedImg?.url?.toString()}
                loading="eager"
              />
            </div>
          )}
        </div>
      </section>
      {error && !loading && (
        <p
          style={{
            color: "red",
            marginBottom: "1rem",
          }}
        >
          {error}
        </p>
      )}
      {videoError && !isLoading && (
        <p
          style={{
            color: "red",
            marginBottom: "1rem",
          }}
        >
          {videoError?.response?.data?.error ?? videoError?.message ?? ""}
        </p>
      )}

      <section className="actions flex">
        <div className="primary_actions flex">
          <button
            className="button md primary_light"
            onClick={() => {
              dispatch({
                type: "SET_ACTIVE",
                payload: 5,
              });
            }}
            disabled={loading || isLoading}
          >
            Back
          </button>
          <button
            className="button md"
            onClick={generateVideo}
            disabled={loading || isLoading}
          >
            {isLoading ? "Generating Video" : "Next"}
          </button>
        </div>

        <input
          disabled={loading || isLoading}
          type="file"
          id="file-uploader"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              // create base64 as url
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                if (e.target.files)
                  setFileData({
                    url: reader.result,
                    file: e.target.files[0],
                    isUrl: false,
                  });
              });
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
          pattern=""
          style={{
            display: "none",
          }}
        />

        <div className="secondary_actions flex">
          <label
            htmlFor="file-uploader"
            className="button md secondary"
            style={{
              opacity: isLoading || loading ? 0.5 : 1,
            }}
          >
            Reupload
          </label>
          {state.imgPrompt && (
            <button
              disabled={isLoading || loading}
              className="button md secondary"
              onClick={generate}
            >
              {loading ? "Regenerating..." : "Regenerate"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default StepSix;
