import { createContext, useContext, useReducer } from 'react';
import { BLACK_PIANO_KEYS, WHITE_PIANO_KEYS } from '../PIANO_KEYS'

const KeyboardContext = createContext(null);
const KeyboardDispatchContext = createContext(null);

const initialKeyboard = {
    "C3": "a",
    "D3": "s",
    "E3": "d",
    "F3": "f",
    "G3": "g",
    "C4": "h",
    "D4": "j",
    "E4": "k",
    "F4": "l",
    "G4": ";",
    "C#3": "w",
    "D#3": "e",
    "F#3": "t",
    "C#4": "u",
    "D#4": "o",
    "F#4": "p",
    "lws": 16,
    "rws": 23,
    "lbs": 16,
    "rbs": 23,
};

export function KeyboardProvider( { children }) {
    const [keyboard, dispatch] = useReducer(
        keyboardReducer,
        initialKeyboard
    );
    return (
        <KeyboardContext.Provider value={keyboard}>
            <KeyboardDispatchContext.Provider value={dispatch}>
                {children}
            </KeyboardDispatchContext.Provider>
        </KeyboardContext.Provider>
    );
}

export function useKeyboard() {
    return useContext(KeyboardContext);
}
  
export function useKeyboardDispatch() {
    return useContext(KeyboardDispatchContext);
}

function keyboardReducer(keyboard, action) {
    const lw = ['a', 's', 'd', 'f', 'g'];
    const rw = ['h', 'j', 'k', 'l', ';'];
    const lb = ['q', 'w', 'e', 'r', 't'];
    const rb = ['y', 'u', 'i', 'o', 'p'];
    switch (action.type) {
        case '<': {
            var kb = Object.fromEntries(
                Object.keys(keyboard).filter((k)=>(rw.includes(keyboard[k]) || rb.includes(keyboard[k])))
                .map((k) => [k, keyboard[k]])
            );
            kb["rws"] = keyboard["rws"];
            kb["rbs"] = keyboard["rbs"];
            kb["lws"] = (keyboard["lws"] == 0) ? 0 : (keyboard["lws"]-1);
            kb["lbs"] = (keyboard["lws"] == 0) ? 0 : (keyboard["lbs"]-1);
            for (let i = 0; i < lw.length; i++) {
                kb[WHITE_PIANO_KEYS[kb['lws']+i]] = lw[i];
            }
            for (let i = 0; i < lb.length; i++) {
                if (BLACK_PIANO_KEYS[kb['lbs']+i].length > 0) {
                    kb[BLACK_PIANO_KEYS[kb['lbs']+i]] = lb[i];
                }
            }
            return kb;
        }
        case ',': {
            var kb = Object.fromEntries(
                Object.keys(keyboard).filter((k)=>(rw.includes(keyboard[k]) || rb.includes(keyboard[k])))
                .map((k) => [k, keyboard[k]])
            );
            kb["rws"] = keyboard["rws"];
            kb["rbs"] = keyboard["rbs"];
            kb["lws"] = (keyboard["lws"] == (WHITE_PIANO_KEYS.length - lw.length)) ? keyboard["lws"] : (keyboard["lws"]+1);
            kb["lbs"] = (keyboard["lbs"] == (BLACK_PIANO_KEYS.length - lb.length)) ? keyboard["lbs"] : (keyboard["lbs"]+1);
            for (let i = 0; i < lw.length; i++) {
                kb[WHITE_PIANO_KEYS[kb['lws']+i]] = lw[i];
            }
            for (let i = 0; i < lb.length; i++) {
                if (BLACK_PIANO_KEYS[kb['lbs']+i].length > 0) {
                    kb[BLACK_PIANO_KEYS[kb['lbs']+i]] = lb[i];
                }
            }
            return kb;
        }
        case '.': {
            var kb = Object.fromEntries(
                Object.keys(keyboard).filter((k)=>(lw.includes(keyboard[k]) || lb.includes(keyboard[k])))
                .map((k) => [k, keyboard[k]])
            );
            kb["lws"] = keyboard["lws"];
            kb["lbs"] = keyboard["lbs"];
            kb["rws"] = (keyboard["rws"] == 0) ? 0 : (keyboard["rws"]-1);
            kb["rbs"] = (keyboard["rws"] == 0) ? 0 : (keyboard["rbs"]-1);
            for (let i = 0; i < rw.length; i++) {
                kb[WHITE_PIANO_KEYS[kb['rws']+i]] = rw[i];
            }
            for (let i = 0; i < rb.length; i++) {
                if (BLACK_PIANO_KEYS[kb['rbs']+i].length > 0) {
                    kb[BLACK_PIANO_KEYS[kb['rbs']+i]] = rb[i];
                }
            }
            return kb;
        }
        case '>': {
            var kb = Object.fromEntries(
                Object.keys(keyboard).filter((k)=>(lw.includes(keyboard[k]) || lb.includes(keyboard[k])))
                .map((k) => [k, keyboard[k]])
            );
            kb["lws"] = keyboard["lws"];
            kb["lbs"] = keyboard["lbs"];
            kb["rws"] = (keyboard["rws"] == (WHITE_PIANO_KEYS.length - rw.length)) ? 0 : (keyboard["rws"]+1);
            kb["rbs"] = (keyboard["rws"] == (BLACK_PIANO_KEYS.length - rb.length)) ? 0 : (keyboard["rbs"]+1);
            for (let i = 0; i < rw.length; i++) {
                kb[WHITE_PIANO_KEYS[kb['rws']+i]] = rw[i];
            }
            for (let i = 0; i < rb.length; i++) {
                if (BLACK_PIANO_KEYS[kb['rbs']+i].length > 0) {
                    kb[BLACK_PIANO_KEYS[kb['rbs']+i]] = rb[i];
                }
            }
            return kb;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
