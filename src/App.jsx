import './App.css'
import { useEffect, useState } from 'react'
import { Stage, Container, Sprite, useTick } from '@pixi/react'

const Bunny = () => {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png'
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [upPressed, setUpPressed] = useState(false)
  const [downPressed, setDownPressed] = useState(false)
  const [leftPressed, setLeftPressed] = useState(false)
  const [rightPressed, setRightPressed] = useState(false)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.code === 'ArrowUp') setUpPressed(true)
      if (e.code === 'ArrowDown') setDownPressed(true)
      if (e.code === 'ArrowLeft') setLeftPressed(true)
      if (e.code === 'ArrowRight') setRightPressed(true)
    }

    function onKeyUp(e) {
      if (e.code === 'ArrowUp') setUpPressed(false)
      if (e.code === 'ArrowDown') setDownPressed(false)
      if (e.code === 'ArrowLeft') setLeftPressed(false)
      if (e.code === 'ArrowRight') setRightPressed(false)
    }

    document.body.addEventListener('keydown', onKeyDown)
    document.body.addEventListener('keyup', onKeyUp)

    return () => {
      document.body.removeEventListener('keydown', onKeyDown)
      document.body.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useTick((delta) => {
    if (upPressed) setY((prevY) => prevY - 1)
    if (downPressed) setY((prevY) => prevY + 1)
    if (leftPressed) setX((prevX) => prevX - 1)
    if (rightPressed) setX((prevX) => prevX + 1)
  })

  return <Sprite image={bunnyUrl} anchor={0.5} x={x} y={y} />
}

const App = () => {
  return (
    <Stage
      width={300}
      height={300}
      options={{ autoDensity: true, backgroundColor: 0x01262a }}
    >
      <Container x={150} y={150}>
        <Bunny />
      </Container>
    </Stage>
  )
}

export default App
