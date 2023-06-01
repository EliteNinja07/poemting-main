import React, { useEffect, useState } from 'react'
import { usePromptState } from '../../shared/context/prompts/PromptProvider'
import { useStepsContext } from '../../shared/context/StepsProvider'
import { imagePromptSuggestions } from '../../shared/data'
import { generateImage } from '../../shared/utils/apis'
import SuggestionCard from '../suggestionCard'

const StepFive = () => {
  const { dispatch } = useStepsContext()
  const [error, setError] = useState('')
  const { state, dispatch: promptDispatch } = usePromptState()
  const [value, setValue] = useState(state?.imgPrompt ?? '')
  const [loading, setLoading] = useState(false)
  const [fileData, setFileData] = useState<{
    file: File
    url: ArrayBuffer | string | null
    isUrl: boolean
  } | null>(null)

  const generate = async () => {
    if (state.generatedImg && state.generatedImg && value === state.imgPrompt) {
      dispatch({
        type: 'SET_ACTIVE',
        payload: 6,
      })
      return
    }
    setLoading(true)
    setError('')
    const data = await generateImage(value)
    promptDispatch({
      type: 'ADD_IMG_PROMPT',
      payload: {
        imgPrompt: value,
      },
    })
    if (typeof data === 'string') {
      setError(data)
    }
    if (data?.length > 0 && typeof data === 'object') {
      promptDispatch({
        type: 'SET_GENERATED_IMG',
        payload: {
          generatedImg: { ...data[0], isUrl: true },
        },
      })
      dispatch({
        type: 'SET_ACTIVE',
        payload: 6,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (fileData) {
      promptDispatch({
        type: 'SET_GENERATED_IMG',
        payload: {
          generatedImg: fileData,
        },
      })
      dispatch({
        type: 'SET_ACTIVE',
        payload: 6,
      })
    }
  }, [fileData])

  return (
    <div>
      <section className="step_header">
        <h3>Describe your image idea</h3>
        <p>
          Upload or generate a picture to be used as a cover image for your
          song.
        </p>
      </section>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          generate()
        }}
      >
        <textarea
          placeholder="Start writing..."
          className="textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <section className="suggestions">
          <h3>Inspirations for you</h3>
          <div
            className={'suggestion_cards scroll-bar flex'}
            style={{
              width: '100%',
            }}
          >
            {imagePromptSuggestions.map((suggestion, index) => (
              <SuggestionCard
                text={suggestion}
                key={index}
                isImg
                active={suggestion === value}
                onClick={() => setValue(suggestion)}
              />
            ))}
          </div>
        </section>

        {error && !loading && (
          <p
            style={{
              color: 'red',
              marginBottom: '1rem',
            }}
          >
            {error}
          </p>
        )}

        <section className="actions flex">
          <div className="primary_actions flex">
            <button
              className="button md primary_light"
              onClick={() => {
                dispatch({
                  type: 'SET_ACTIVE',
                  payload: 4,
                })
              }}
              type="button"
              disabled={loading}
            >
              Back
            </button>
            <button className="button md" onClick={generate} disabled={loading}>
              {state?.generatedImg &&
              state?.generatedImg &&
              value === state.imgPrompt
                ? 'Next'
                : loading
                ? 'Generating...'
                : 'Generate'}
            </button>
          </div>
          <input
            disabled={loading}
            type="file"
            id="file-uploader"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                // create base64 as url
                const reader = new FileReader()
                reader.addEventListener('load', () => {
                  if (e.target.files)
                    setFileData({
                      url: reader.result,
                      file: e.target.files[0],
                      isUrl: false,
                    })
                })
                reader.readAsDataURL(e.target.files[0])
              }
            }}
            pattern=""
            style={{
              display: 'none',
            }}
          />
          <div className="secondary_actions flex">
            <label htmlFor="file-uploader" className="button md secondary">
              Upload
            </label>
          </div>
        </section>
      </form>
    </div>
  )
}

export default StepFive
