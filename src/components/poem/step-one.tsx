import React, { useEffect, useState } from 'react'
import { usePromptState } from '../../shared/context/prompts/PromptProvider'
import { useStepsContext } from '../../shared/context/StepsProvider'
import { poemPromptSuggestions } from '../../shared/data'
import { promptChatgpt } from '../../shared/utils/apis'
import SuggestionCard from '../suggestionCard'

const StepOne = () => {
  const { state, dispatch } = usePromptState()
  const { dispatch: stepDispatch } = useStepsContext()
  const [value, setValue] = useState(state?.prompt ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setValue(state.prompt ? state.prompt : '')
  }, [state.prompt])

  const handleSubmit = async () => {
    if (value.trim().length >= 5) {
      dispatch({ type: 'ADD_PROMPT', payload: { ...state, prompt: value } })
    }
    setLoading(true)
    setError('')
    const response = await promptChatgpt(value)
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

  return (
    <div>
      <section className="step_header">
        <h3>Describe your idea</h3>
        <p>
          Briefly describe your song / greeting card idea and I will generate
          lyrics or a poem for you
        </p>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!state.poem || state.prompt !== value) handleSubmit()
          if (state.poem && state.prompt === value)
            stepDispatch({
              type: 'SET_ACTIVE',
              payload: 2,
            })
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
            {poemPromptSuggestions.map((suggestion, index) => (
              <SuggestionCard text={suggestion} key={index} />
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
            <button className="button md" type="submit" disabled={loading}>
              {loading && (!state.poem || state.prompt !== value)
                ? 'Generating...'
                : 'Next'}
            </button>
            {state.poem && (
              <button
                type="button"
                className="button secondary md"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? 'Generating...' : 'Regenerate'}
              </button>
            )}
          </div>
        </section>
      </form>
    </div>
  )
}

export default StepOne
