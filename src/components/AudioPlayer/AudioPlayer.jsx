import * as Tone from "tone";
import { useKeyboard } from "../../contexts/KeyboardContext";
import { PIANO_KEYS } from "../../PIANO_KEYS";
import { useEffect, useState } from "react";
import { useKeysPressed, useKeysPressedDispatch } from "../../contexts/KeysPressedContext";

const urls = Object.fromEntries(PIANO_KEYS.map((key) => [key, key.replace("#", "s")+".mp3"]));
const sampler = new Tone.Sampler({
    urls: urls,
    release: 1,
    baseUrl: "../../../public/piano_sounds_2/",
}).toDestination();

const AudioPlayer = () => {
    const keyboard = useKeyboard();
    const keysPressed = useKeysPressed();
    const keysPressedDispatch = useKeysPressedDispatch();
    const [keysToNotes, setKeysToNotes] = useState(
        Object.fromEntries(
            Object.keys(keyboard)
            .map((key) => [keyboard[key], key]))
    );
    useEffect(
        () => {
            setKeysToNotes(
                Object.fromEntries(
                    Object.keys(keyboard)
                    .map((key) => [keyboard[key], key])
                )
            )
        },
        [keyboard]
    );
    function handleKeyDown(event) {
        if (keysToNotes.hasOwnProperty(event.key) && !keysPressed.hasOwnProperty(event.key)) {
            sampler.triggerAttack(keysToNotes[event.key]);
            keysPressedDispatch({ type: 'add', key: event.key })
        }
    }
    function handleKeyUp(event) {
        if (keysToNotes.hasOwnProperty(event.key) && keysPressed.hasOwnProperty(event.key)) {
            sampler.triggerRelease(keysToNotes[event.key]);
            keysPressedDispatch({ type: 'remove', key: event.key })
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });
    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    });
    return <></>
}

export default AudioPlayer