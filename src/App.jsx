import PianoDisplay from './components/Piano/Piano'
import './App.css'
import { KeyboardProvider } from './contexts/KeyboardContext';
import { KeysPressedProvider } from './contexts/KeysPressedContext';
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import Controls from './components/Controls/Controls'
import NotationDisplay from './components/NotationDisplay/NotationDisplay';

function App() {

  return (
    <>
      <KeysPressedProvider>
        <KeyboardProvider>
          <NotationDisplay></NotationDisplay>
          <AudioPlayer></AudioPlayer>
          <PianoDisplay></PianoDisplay>
          <Controls></Controls>
        </KeyboardProvider>
      </KeysPressedProvider>
    </>
  )
}

export default App
