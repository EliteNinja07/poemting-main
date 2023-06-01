import React, { useEffect, useState } from 'react'
import { usePromptState } from '../../shared/context/prompts/PromptProvider'
import { useStepsContext } from '../../shared/context/StepsProvider'
import { recommendMusic } from '../../shared/utils/apis'
import AudioPlayer from '../media-player/audio'

const StepFour = () => {
  const { dispatch } = useStepsContext()
  const { state, dispatch: promptDispatch } = usePromptState()
  const poem = state.poem?.trimStart().replace(/\n/g, '<br/>')
  const [message, setMessage] = useState('')
  const [recomendation, setRecomendation] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const musicRecommendation = async () => {
      const res = await recommendMusic(state.poem ?? '')
      setLoading(false)
      setRecomendation(
        res?.data?.choices[0].text.trimStart().replace(/\n/g, '<br/>')
      )
    }

    musicRecommendation().catch((err) => console.log(err))
  }, [state.poem])

  return (
    <div>
      <section className="step_header">
        <h3>Review Generated Poem</h3>
        <p>
          Here is what I came up with. You can use the regenerate button to try
          again or go back and refine your prompt idea.
        </p>
      </section>
      <section
        className="preview_area"
        dangerouslySetInnerHTML={{ __html: poem ? poem : '' }}
      />
      {/* preview audio */}
      <AudioPlayer />
      {message && (
        <p
          style={{
            color: 'green',
            marginBottom: '1rem',
          }}
        >
          {message}
        </p>
      )}
      <input
        // disabled={loading || isLoading}
        type="file"
        id="file-uploader"
        accept=".mp3,audio/*;capture=microphone"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            // create base64 as url
            const reader = new FileReader()
            reader.addEventListener('load', () => {
              if (e.target.files) {
                // setFileData({
                //   url: reader.result,
                //   file: e.target.files[0],
                //   isUrl: false,
                // });
                promptDispatch({
                  type: 'SET_BACKGROUND_MUSIC',
                  payload: {
                    backgroundMusic: {
                      file: e.target.files[0],
                      url: reader.result,
                    },
                  },
                })
                setMessage('Background Music uploaded successfully')
              }
            })
            reader.readAsDataURL(e.target.files[0])
          }
        }}
        pattern=""
        style={{
          display: 'none',
        }}
      />

      <section className="actions flex">
        <div className="primary_actions flex">
          <button
            className="button md primary_light"
            onClick={() => {
              dispatch({
                type: 'SET_ACTIVE',
                payload: 3,
              })
            }}
          >
            Back
          </button>
          <button
            className="button md"
            onClick={() => {
              // step three
              dispatch({
                type: 'SET_ACTIVE',
                payload: 5,
              })
            }}
          >
            Next
          </button>
        </div>
      </section>

      <section className="step_header" style={{ marginBottom: '16px' }}>
        <h3>Upload background music(optional)</h3>
        <p style={{ paddingBottom: '16px' }}>
          {loading && 'Loading recomendation...'}
          {recomendation}
        </p>
        <div className="secondary_actions flex">
          <label htmlFor="file-uploader" className="button md secondary">
            Upload Background Music
          </label>
        </div>
      </section>
    </div>
  )
}

export default StepFour
