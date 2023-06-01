import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { usePromptState } from '../../shared/context/prompts/PromptProvider'
import { useStepsContext } from '../../shared/context/StepsProvider'
import VideoPlayer from '../media-player/video'
import { Tooltip } from 'react-tooltip'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'next-share'

const StepSeven = () => {
  const { dispatch } = useStepsContext()
  const { state, dispatch: promptDispatch } = usePromptState()
  const [isCopied, setCopied] = useState(false)
  function downloadFile(url: string) {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file)
        const aTag = document.createElement('a')
        aTag.href = tempUrl
        aTag.target = '_blank'
        aTag.download = 'poemting_generated_file'
        aTag.download = url.replace(/^.*[\\\/]/, '')
        document.body.appendChild(aTag)
        aTag.click()
        URL.revokeObjectURL(tempUrl)
        aTag.remove()
      })
      .catch(() => {
        alert('Failed to download file!')
      })
  }

  useEffect(() => {
    const removeCopyStatus = () => {
      setCopied(false)
    }
    setTimeout(removeCopyStatus, 1000)
    return () => clearTimeout(1000)
  }, [isCopied])

  const link =
    window.location.origin +
    '/preview-video/' +
    state.generatedVideo
      ?.split('/')
      [state.generatedVideo?.split('/').length - 1].split('.')[0]

  return (
    <div>
      <section className="step_header">
        <h3>Review and Share Generated Poem</h3>
        <p>
          Here is the Poem I came up with. You use the regenerate button to try
          again or go back and refine your prompt idea.
        </p>
      </section>
      <section className="video_container">
        {/* preview image */}
        <div
          className="flex"
          style={{
            width: '100%',
            flexDirection: 'column',
          }}
        >
          {state.generatedVideo && <VideoPlayer />}
        </div>
      </section>

      <section className="flex">
        <div className="primary_actions flex">
          {state.generatedVideo && (
            <button
              className="button md primary_light"
              style={{
                marginRight: '1rem',
              }}
              onClick={() => downloadFile(state.generatedVideo ?? '')}
            >
              Export As Video
            </button>
          )}
          {state.generatedAudio?.audio && (
            <button
              className="button md"
              onClick={() => downloadFile(state.generatedAudio?.audio ?? '')}
            >
              Export As audio
            </button>
          )}
        </div>
      </section>
      <section
        style={{
          padding: '2rem 0',
        }}
        className="flex social-media"
      >
        {/* share section */}
        <ul
          className="flex"
          style={{
            listStyle: 'none',
          }}
        >
          {/* <li>
            <a href="#">
              <Icon
                icon={"ph:youtube-logo-fill"}
                height={30}
                width={30}
                color="#c4302b"
              />
            </a>
          </li> */}
          {/* <li>
            <Icon
              icon={"ph:tiktok-logo-fill"}
              height={30}
              width={30}
              color="#ff0050"
            />
          </li> */}
          <li>
            <TwitterShareButton
              title={'I Created a poem using AI, check it out!'}
              hashtags={['ai', 'poem', 'openai', 'poemting']}
              url={link}
            >
              <Icon
                icon={'ph:twitter-logo-fill'}
                height={30}
                width={30}
                color="#00acee"
              />
            </TwitterShareButton>
          </li>
          {/* <li>
            <Icon
              icon={"ph:instagram-logo-fill"}
              height={30}
              width={30}
              color="#4f5bd5"
            />
          </li> */}
          <li>
            <FacebookShareButton
              title={'AI Created a poem using AI, check it out!'}
              url={link}
            >
              <Icon
                icon={'ph:facebook-logo-fill'}
                height={30}
                width={30}
                color="#3b5998"
              />
            </FacebookShareButton>
          </li>
          <li>
            <LinkedinShareButton
              title={'AI Created a poem using AI, check it out!'}
              url={link}
            >
              <Icon
                icon={'ph:linkedin-logo-fill'}
                height={30}
                width={30}
                color="#0072b1"
              />
            </LinkedinShareButton>
          </li>
          <li>
            <button
              data-tooltip-id={'copyToClipboard'}
              data-tooltip-content={isCopied ? 'Link copied to clipboard!' : ''}
              onClick={() => {
                // add copy functionality
                navigator.clipboard.writeText(link)
                setCopied(true)
              }}
            >
              <Icon
                icon={'ph:link-fill'}
                height={30}
                width={30}
                color="#0072b1"
              />
            </button>
          </li>
        </ul>
        <Tooltip id="copyToClipboard" />
      </section>
      <section className="flex">
        <div className="primary_actions flex">
          <button
            className="button md primary_light"
            style={{
              marginRight: '1rem',
            }}
            onClick={() => {
              dispatch({
                type: 'SET_ACTIVE',
                payload: 6,
              })
            }}
          >
            Back
          </button>
          <button
            className="button md"
            onClick={() => {
              promptDispatch({
                type: 'RESET_POEM',
                payload: {},
              })
              dispatch({ type: 'SET_ACTIVE', payload: 1 })
            }}
          >
            Create New Poem
          </button>
        </div>
      </section>
    </div>
  )
}

export default StepSeven
