import React, { useState } from 'react'
import { usePromptState } from '../../shared/context/prompts/PromptProvider'
import { useStepsContext } from '../../shared/context/StepsProvider'
import { promptChatgpt } from '../../shared/utils/apis'

const StepTwo = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { state, dispatch } = usePromptState()
  const { dispatch: stepDispatch } = useStepsContext()

  const handleRegeneration = async () => {
    setLoading(true)
    setError('')
    const response = await promptChatgpt(state.prompt ? state.prompt : '')
    if (typeof response === 'string') setError(response)
    setLoading(false)

    if (
      response?.data?.choices[0].text &&
      response?.data?.choices[0].text !== ''
    ) {
      dispatch({
        type: 'ADD_POEM',
        payload: { ...state, poem: response?.data?.choices[0].text },
      })
      stepDispatch({
        type: 'SET_ACTIVE',
        payload: 2,
      })
    }
  }

  const poem = state.poem?.trimStart().replace(/\n/g, '<br/>')

  return (
    <div>
      <section className="step_header">
        <h3>Review Generated words</h3>
        <p>
          Here is what I came up with. You can use the regenerate button to try
          again or go back and refine your prompt idea.
        </p>
      </section>

      {/* <section
        className="preview_area"
        dangerouslySetInnerHTML={{ __html: poem ? poem : "" }}
      /> */}
      <textarea
        placeholder="Start writing..."
        className="textarea"
        value={state.poem?.trimStart()}
        onChange={(e) => {
          dispatch({
            type: 'ADD_POEM',
            payload: { ...state, poem: e.target.value },
          })
        }}
      />
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
              // step one
              stepDispatch({
                type: 'SET_ACTIVE',
                payload: 1,
              })
            }}
            disabled={loading}
          >
            Back
          </button>
          <button
            className="button md"
            onClick={() => {
              // step three
              stepDispatch({
                type: 'SET_ACTIVE',
                payload: 3,
              })
            }}
            disabled={loading}
          >
            Next
          </button>
        </div>

        <div className="secondary_actions flex">
          <button className="button md secondary" onClick={handleRegeneration}>
            {loading ? 'Regenerating...' : 'Regenerate'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default StepTwo
