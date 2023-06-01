import React, { useEffect, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import VoiceCard from '../voiceCard'
import { usePromptState } from '../../shared/context/prompts/PromptProvider'
import SelectItem from '../selectItem'
import { VoiceType } from '../../shared/types'
import { useStepsContext } from '../../shared/context/StepsProvider'
import {
  useDilects,
  useGenerateVoice,
  useLanguages,
  useVoices,
} from '../../shared/hooks/useApi'
import Card from '../card'

const StepThree = () => {
  const { state, dispatch } = usePromptState()
  const { dispatch: stepDispatch } = useStepsContext()
  const { data: languages } = useLanguages()
  const [shouldGoNext, setShouldGoNext] = useState(false)
  const { data: dialects } = useDilects()
  const [selectedSample, setSelectedSample] = useState({
    selectedVoiceId: state.selectedVoiceId ?? '',
    selectedStyleId: state.selectedStyleId ?? null,
  })
  const [enabled, setEnabled] = useState(false)
  const [languageId, setLanguageId] = useState('61b8b2f54268666c126babc9')
  const [dialectId, setDialectId] = useState('61b8b31c4268666c126bace7')
  const [isPlaying, setPlaying] = useState(false)
  const [currentPlaying, setCurrentPlaying] = useState({ id: '', src: '' })
  const {
    data: voices,
    isLoading,
    isRefetching,
    refetch: refetchVoices,
  } = useVoices({
    languageId,
    dialectId,
  })

  const handlePlay = (voiceId: string) => {
    const playedVoice = voices.find((voice) => voice._id === voiceId)

    setCurrentPlaying({
      id: voiceId,
      src: playedVoice?.audioSample ? playedVoice?.audioSample : '',
    })
    if (currentPlaying.id === voiceId) setPlaying(!isPlaying)
    else setPlaying(true)
  }

  const {
    isLoading: loading,
    data,
    isFetching,
    refetch,
  } = useGenerateVoice({
    voiceId: selectedSample.selectedVoiceId ?? '',
    voiceStyleId: selectedSample.selectedStyleId ?? null,
    content: state.poem ?? '',
    enabled,
  })

  useEffect(() => {
    const audio: HTMLAudioElement | null = document.querySelector(
      'audio#preview-voice'
    )

    if (audio)
      audio.onended = () => {
        setPlaying(false)
        return
      }

    if (isPlaying && currentPlaying.src) {
      audio?.play()
    }

    if (!isPlaying) {
      audio?.pause()
    }
  }, [currentPlaying, isPlaying])

  useEffect(() => {
    if (data?.data?.audio) {
      dispatch({
        type: 'SET_GENERATED_AUDIO',
        payload: {
          generatedAudio: data.data,
          ...(!state.generatedAudio
            ? { prevGeneratedAudio: data?.data }
            : {
                prevGeneratedAudio: state.generatedAudio,
              }),
        },
      })
      dispatch({
        type: 'SELECT_VOICE',
        payload: {
          selectedStyleId:
            selectedSample.selectedStyleId === selectedSample.selectedVoiceId
              ? null
              : selectedSample.selectedStyleId
              ? selectedSample.selectedStyleId
              : null,
          selectedVoiceId: selectedSample.selectedVoiceId,
        },
      })
      setEnabled(false)
      if (shouldGoNext) {
        stepDispatch({
          type: 'SET_ACTIVE',
          payload: 4,
        })
      }
    }
  }, [data])

  const generate = async () => {
    if (selectedSample.selectedVoiceId) {
      setEnabled(true)
    }
    if (data && enabled) {
      refetch()
    }
  }

  return (
    <div>
      <section className="step_header">
        <h3>Choose a singing voice</h3>
        <p>Here is a list of singing voice you can choose from.</p>
      </section>

      <section className="choose_language_dilect flex">
        <div className="choose_label flex-column">
          <p>Choose Language</p>
          <Select.Root onValueChange={(value) => setLanguageId(value)}>
            <Select.Trigger
              className="select_language_trigger flex reset_button"
              aria-label="Voice Style"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="select_icon">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="select_content" position="popper">
                <Select.ScrollUpButton className="select_scroll_button">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="select_viewport">
                  {languages?.map((language, index) => (
                    <SelectItem value={language._id} key={index}>
                      {language.name}
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
        <div className="choose_label flex-column">
          <p>Choose Dilect</p>
          <Select.Root onValueChange={(value) => setDialectId(value)}>
            <Select.Trigger
              className="select_language_trigger flex reset_button"
              aria-label="Voice Style"
            >
              <Select.Value placeholder="Select" />
              <Select.Icon className="select_icon">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="select_content" position="popper">
                <Select.ScrollUpButton className="select_scroll_button">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="select_viewport">
                  {dialects?.map((dialect, index) => (
                    <SelectItem value={dialect._id} key={index}>
                      {dialect.name}
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
      </section>

      <section
        className="voices_container scroll-bar"
        style={{
          padding: 1,
        }}
      >
        {voices?.length > 0 ? (
          voices.map((voice: VoiceType) => (
            <Card
              key={voice._id}
              style={{
                padding: 0,
              }}
              active={selectedSample.selectedVoiceId === voice?._id}
            >
              <VoiceCard
                play={isPlaying && currentPlaying.id === voice._id}
                id={voice._id}
                gender={voice.gender}
                name={voice.name}
                voiceStyles={voice.styles}
                handlePlay={handlePlay}
                selectVoiceStyle={(src) => {
                  setCurrentPlaying((prev) => {
                    return { ...prev, src }
                  })
                  if (currentPlaying.id !== voice._id) setPlaying(false)
                }}
                handleSelectVoice={(selectedVoiceId, selectedVoiceStyleId) => {
                  setSelectedSample({
                    selectedStyleId: selectedVoiceStyleId ?? null,
                    selectedVoiceId: selectedVoiceId,
                  })
                }}
              />
            </Card>
          ))
        ) : isLoading || isRefetching ? (
          <p>Fetching voices...</p>
        ) : (
          <div>
            <p style={{ color: 'red', marginBottom: '.7rem' }}>
              No voices found, try to select language and dialect that match
            </p>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#2563EB',
              }}
              onClick={() => refetchVoices()}
            >
              Retry?
            </button>
          </div>
        )}
      </section>
      <audio src={currentPlaying.src} id={'preview-voice'}></audio>
      {!data?.data?.audio && data?.message && !loading && !isFetching && (
        <p
          style={{
            color: 'red',
            marginBottom: '1rem',
          }}
        >
          {data?.message}
        </p>
      )}
      <section className="actions flex">
        <div className="primary_actions flex">
          <button
            className="button md primary_light"
            onClick={() => {
              // step two
              stepDispatch({
                type: 'SET_ACTIVE',
                payload: 2,
              })
            }}
          >
            Back
          </button>
          {selectedSample.selectedVoiceId && !state.generatedAudio && (
            <button
              className="button md"
              onClick={() => {
                setShouldGoNext(true)
                generate()
              }}
              disabled={loading || isFetching}
            >
              {loading || isFetching ? 'Generating...' : 'Generate'}
            </button>
          )}
          {state.generatedAudio && (
            <button
              className="button md"
              onClick={() => {
                // if (
                //   selectedSample.selectedVoiceId === state.selectedVoiceId &&
                //   selectedSample.selectedStyleId === state.selectedStyleId
                // ) {
                //   stepDispatch({
                //     type: "SET_ACTIVE",
                //     payload: 4,
                //   });
                // } else {
                setShouldGoNext(true)
                generate()
                // }
              }}
              disabled={loading || isFetching}
            >
              {loading ? 'Generating' : 'Next'}
            </button>
          )}
        </div>
        {/* {state.selectedVoiceId && state.generatedAudio && (
          <div className="secondary_actions flex">
            <button
              className="button secondary md"
              onClick={() => {
                setShouldGoNext(true);
                generate();
              }}
              disabled={loading || isFetching}
            >
              {loading || isFetching ? "Generating..." : "Generate"}
            </button>
          </div>
        )} */}
      </section>
    </div>
  )
}

export default StepThree
