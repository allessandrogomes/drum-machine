import './App.scss'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'

function App() {

  const heaterKit = [
    {
      key: "Q",
      audioSrc: "audios/Heater-1.mp3",
      name: "Heater 1"
    },
    {
      key: "W",
      audioSrc: "audios/Heater-2.mp3",
      name: "Heater 2"
    },
    {
      key: "E",
      audioSrc: "audios/Heater-3.mp3",
      name: "Heater 3"
    },
    {
      key: "A",
      audioSrc: "audios/Heater-4.mp3",
      name: "Heater 4"
    },
    {
      key: "S",
      audioSrc: "audios/Heater-5.mp3",
      name: "Heater 5"
    },
    {
      key: "D",
      audioSrc: "audios/Heater-6.mp3",
      name: "Heater 6"
    },
    {
      key: "Z",
      audioSrc: "audios/Heater-7.mp3",
      name: "Heater 7"
    },
    {
      key: "X",
      audioSrc: "audios/Heater-8.mp3",
      name: "Heater 8"
    },
    {
      key: "C",
      audioSrc: "audios/Heater-9.mp3",
      name: "Heater 9"
    }
  ];


  const smoothPianoKit = [
    {
      key: "Q",
      audioSrc: "audios/Chord_1.mp3",
      name: "Chord 1"
    },
    {
      key: "W",
      audioSrc: "audios/Chord_2.mp3",
      name: "Chord 2"
    },
    {
      key: "E",
      audioSrc: "audios/Chord_3.mp3",
      name: "Chord 3"
    },
    {
      key: "A",
      audioSrc: "audios/Chord_4.mp3",
      name: "Chord 4"
    },
    {
      key: "S",
      audioSrc: "audios/Chord_5.mp3",
      name: "Chord 5"
    },
    {
      key: "D",
      audioSrc: "audios/Chord_6.mp3",
      name: "Chord 6"
    },
    {
      key: "Z",
      audioSrc: "audios/Chord_7.mp3",
      name: "Chord 7"
    },
    {
      key: "X",
      audioSrc: "audios/Chord_8.mp3",
      name: "Chord 8"
    },
    {
      key: "C",
      audioSrc: "audios/Chord_9.mp3",
      name: "Chord 9"
    }
  ];


  const HEATER_KIT = "Heater Kit"
  const SMOOTH_PIANO_KIT = "Smooth Piano Kit"

  const [powerOn, setPowerOn] = useState(true)
  const [volume, setVolume] = useState(1)
  const [bank, setBank] = useState(HEATER_KIT)
  const [display, setDisplay] = useState("")

  function playAudio(key, name) {
    const audio = document.getElementById(key)
    if (audio && powerOn) {
      audio.play()
      setDisplay(name)
    }
  }

  function handleKeyPress(event) {
    const key = event.key.toUpperCase()
    const kit = bank === HEATER_KIT ? heaterKit : smoothPianoKit
    const pad = kit.find(item => item.key === key)
    if (pad && powerOn) {
      const padElement = document.getElementById(`pad-${key}`)
      if (padElement) {
        padElement.classList.add('active')
      }
      playAudio(key, pad.name)
    }
  }

  function handleKeyRelease(event) {
    const key = event.key.toUpperCase()
    const pad = document.getElementById(`pad-${key}`)
    if (pad) {
      pad.classList.remove('active')
    }
  }

  function handleVolumeChange(event) {
    if (powerOn) {
      const newVolume = event.target.value
      setVolume(newVolume)
      const displayVolume = `${(newVolume * 100).toFixed(0)}%`
      setDisplay(displayVolume)

      const audioElements = document.querySelectorAll('audio')
      audioElements.forEach(audio => {
        audio.volume = newVolume
      })
    }
  }

  function handleChangeBank(selectedBank) {
    if (powerOn) {
      setBank(selectedBank)
      setDisplay(selectedBank)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('keyup', handleKeyRelease)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('keyup', handleKeyRelease)
    }
  }, [powerOn])

  return (
    <div id="container">
      <h1>Drum Machine</h1>
      <div id="drum-machine">
        <div id="keyboard">
          {(bank === HEATER_KIT ? heaterKit : smoothPianoKit).map(item =>
            <div onClick={() => playAudio(item.key, item.name)} className="drum-pad" id={`pad-${item.key}`} key={item.key}>{item.key}
              <audio className="clip" id={item.key} src={item.audioSrc}></audio>
            </div>
          )}
        </div>
        <div id="controls">
          <Form >
            <label>Power</label>
            <Form.Switch onChange={() => setPowerOn(prevState => !prevState)} checked={powerOn} />
          </Form>
          <div id="display">{display}</div>
          <div>
            <p>Volume</p>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
          </div>
          <div className="bank">
            <p>Bank</p>
            <div className="bank-items">
              <div>
                <label htmlFor="bank-1">1</label>
                <input id="bank-1" name="bank" value="bank-1" type="radio" onChange={() => handleChangeBank(HEATER_KIT)} checked={bank === HEATER_KIT ? true : false} />
              </div>
              <div>
                <label htmlFor="bank-2">2</label>
                <input id="bank-2" name="bank" value="bank-2" type="radio" onChange={() => handleChangeBank(SMOOTH_PIANO_KIT)} checked={bank === SMOOTH_PIANO_KIT ? true : false} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer><a href="https://github.com/allessandrogomes" target="_blank">by Alessandro Gomes</a></footer>
    </div>
  )
}

export default App
