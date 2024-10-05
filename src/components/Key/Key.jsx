import { useKeyboard } from "../../contexts/KeyboardContext";
import "./Key.css"

export default function Key({ note, octave }) {
  const keyboard = useKeyboard();
  const key = note+octave;
  const mapping = (keyboard.hasOwnProperty(key)) ? keyboard[key] : "";
  const cls = (note.includes('#')) ? 'key black-key' : 'key white-key';
  return (
    <div id={key} className={cls}>
      <p className="key-name">{key}</p>
      <p className="mapping-name">{mapping}</p>
    </div>
  )
}

