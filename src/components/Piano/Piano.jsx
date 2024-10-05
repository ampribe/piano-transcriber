import './piano.css'
import Key from '../Key/Key';
import { PIANO_KEYS } from '../../PIANO_KEYS';
import { useKeyboardDispatch } from '../../contexts/KeyboardContext';
import { useEffect } from 'react';

function PianoDisplay() {
    const keyboardDispatch = useKeyboardDispatch();
    function handleKeyDown(event) {
        console.log(event.key);
        if (event.key == '<') {
            keyboardDispatch({ type: '<' });
        }
        if (event.key == ',') {
            keyboardDispatch({ type: ',' });
        }
        if (event.key == '.') {
            keyboardDispatch({ type: '.' });
        }
        if (event.key == '>') {
            keyboardDispatch({ type: '>'});
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });
    return (
        <div id="piano">
            {PIANO_KEYS.map(
                (key) =>
                <Key key={key} octave={key[key.length-1]} note={key.substring(0, key.length-1)}></Key>)}
        </div>
    );
}

export default PianoDisplay