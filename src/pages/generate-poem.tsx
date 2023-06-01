import React, { useLayoutEffect, useRef, useState } from 'react'
import StepOne from '../components/poem/step-one'
import StepTwo from '../components/poem/step-two'
import StepThree from '../components/poem/step-three'
import WelcomeTag from '../components/welcomeTag'
import Layout from '../layout'
import { useStepsContext } from '../shared/context/StepsProvider'
import { useWindowSize } from '../shared/hooks'
import StepFour from '../components/poem/step-four'
import StepFive from '../components/poem/step-five'
import StepSix from '../components/poem/step-six'
import StepSeven from '../components/poem/step-seven'

const GeneratePoem = () => {
  const { state } = useStepsContext()
  const { width } = useWindowSize()
  const [height, setHeight] = useState<string | number>('0px')
  const stepOneRef = useRef<HTMLDivElement>(null)
  const stepTwoRef = useRef<HTMLDivElement>(null)
  const stepThreeRef = useRef<HTMLDivElement>(null)
  const stepFourRef = useRef<HTMLDivElement>(null)
  const stepFiveRef = useRef<HTMLDivElement>(null)
  const stepSixRef = useRef<HTMLDivElement>(null)
  const stepSevenRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (state.steps[0].active && stepOneRef?.current)
      setHeight(stepOneRef?.current?.scrollHeight)
    if (state.steps[1].active && stepTwoRef?.current)
      setHeight(stepTwoRef?.current?.scrollHeight)
    if (state.steps[2].active && stepThreeRef?.current)
      setHeight(stepThreeRef?.current?.scrollHeight)
    if (state.steps[3].active && stepFourRef?.current)
      setHeight(stepFourRef?.current?.scrollHeight)
    if (state.steps[4].active && stepFiveRef?.current)
      setHeight(stepFiveRef?.current?.scrollHeight)
    if (state.steps[5].active && stepSixRef?.current)
      setHeight(stepSixRef?.current?.scrollHeight)
    if (state.steps[6].active && stepSevenRef?.current)
      setHeight(stepSevenRef?.current?.scrollHeight)
    // one last step
  }, [state])

  return (
    <Layout sidebarContent={<WelcomeTag />} altSidebarImage>
      {/* display contents */}
      <section
        style={{
          display: 'flex',
          width: `${state.steps.length * 100}%`,
          height: height ?? '100%',
          marginLeft: state.steps[0].active
            ? 0
            : state.steps[1].active
            ? '-100%'
            : state.steps[2].active
            ? '-200%'
            : state.steps[3].active
            ? '-300%'
            : state.steps[4].active
            ? '-400%'
            : state.steps[5].active
            ? '-500%'
            : state.steps[6].active
            ? '-600%'
            : '0',
          transition: '.25s',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'max-content',
            overflow: 'hidden',
            padding:
              width <= 500
                ? state.steps[0].active
                  ? `0 2% 0 0.5%`
                  : `0 0 0 0.5%`
                : '0 3rem',
          }}
          ref={stepOneRef}
        >
          {state.steps[0].active && <StepOne />}
        </div>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'max-content',
            padding:
              width <= 500
                ? state.steps[1].active
                  ? `0 1% 0 0.5%`
                  : `0 0 0 0.5%`
                : '0 3rem',
          }}
          ref={stepTwoRef}
        >
          {state.steps[1].active && <StepTwo />}
        </div>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'max-content',
            padding:
              width <= 500
                ? state.steps[2].active
                  ? `0 0.7% 0 0.5%`
                  : `0 0 0 0.5%`
                : '0 3rem',
          }}
          ref={stepThreeRef}
        >
          {state.steps[2].active && <StepThree />}
        </div>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'max-content',
            padding:
              width <= 500
                ? state.steps[3].active
                  ? `0 0.7% 0 0.5%`
                  : `0 0 0 0.5%`
                : '0 3rem',
          }}
          ref={stepFourRef}
        >
          {state.steps[3].active && <StepFour />}
        </div>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'max-content',
            overflow: 'hidden',
            padding:
              width <= 500
                ? state.steps[4].active
                  ? `0 0.5% 0 0.5%`
                  : `0 0 0 0.5%`
                : '0 3rem',
          }}
          ref={stepFiveRef}
        >
          {state.steps[4].active && <StepFive />}
        </div>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'max-content',
            overflow: 'hidden',
            padding:
              width <= 500
                ? state.steps[5].active
                  ? `0 0.4% 0 0.5%`
                  : `0 0 0 0.5%`
                : '0 3rem',
          }}
          ref={stepSixRef}
        >
          {state.steps[5].active && <StepSix />}
        </div>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'max-content',
            overflow: 'hidden',
            padding:
              width <= 500
                ? state.steps[6].active
                  ? `0 0.25% 0 0.5%`
                  : `0 0 0 0.5%`
                : '0 3rem',
          }}
          ref={stepSevenRef}
        >
          {state.steps[6].active && <StepSeven />}
        </div>
        {/* add more steps */}
      </section>
    </Layout>
  )
}

export default GeneratePoem
