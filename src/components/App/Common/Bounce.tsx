import { css, keyframes } from "@emotion/react"

const Bounce = () => {
  return (
    <div
      css={css`
        width: 90px;
        height: 90px;
        position: relative;
      `}
    >
      <div css={[small, animateDice3]} />
      <div css={[medium, animateDice2]} />
      <div css={[largest, animateDice1]} />
    </div>
  )
}

const largest = css`
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background-color: #8092ec;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const medium = css`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  background-color: #b3bbe9;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const small = css`
  width: 16px;
  height: 16px;
  border-radius: 6px;
  background-color: #8092ec;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const scatterAndGather1 = keyframes`
  0%{
    transform: translate(-50%, -10%) rotate(0deg);
  }
  50%{
    transform: translate(-2%, -100%) rotate(40deg);
  }
  100%{
    transform: translate(-50%, -10%) rotate(0deg);
  }
`

const scatterAndGather2 = keyframes`
  0%{
    transform: translate(-50%, 30%) rotate(0deg);
  }
  50%{
    transform: translate(-150%, -100%) rotate(20deg);
  }
  100%{
    transform: translate(-50%, 30%) rotate(0deg);
  }
`

const scatterAndGather3 = keyframes`
  0%{
    transform: translate(-80%, 0%) rotate(0deg);
  }
  50%{
    transform: translate(-110%, -310%) rotate(-210deg);
  }
  100%{
    transform: translate(-80%, 0%) rotate(0deg);
  }
`

const animateDice1 = css`
  animation: ${scatterAndGather1} 2s infinite;
`

const animateDice2 = css`
  animation: ${scatterAndGather2} 2s ease-in-out infinite reverse;
`

const animateDice3 = css`
  animation: ${scatterAndGather3} 2s ease-in-out infinite;
`

export default Bounce
