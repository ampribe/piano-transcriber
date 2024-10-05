import { createContext, useContext, useReducer } from 'react';

const KeysPressedContext = createContext(null);
const KeysPressedDispatchContext = createContext(null);

const initialKeysPressed = {};

function keysPressedReducer(keysPressed, action) {
    switch (action.type) {
        case "add": {
            return { [action.key]: Date.now(), ...keysPressed }
        }
        case "remove": {
            const { [action.key]: _, ...newKeysPressed } = keysPressed
      return newKeysPressed
        }
        default: {
            throw Error("Unknown action: " + action.type)
        }
    }
}

export function useKeysPressed() {
    return useContext(KeysPressedContext);
}

export function useKeysPressedDispatch() {
    return useContext(KeysPressedDispatchContext);
}

export function KeysPressedProvider({ children }) {
    const [keysPressed, dispatch] = useReducer(
        keysPressedReducer,
        initialKeysPressed
    );
    return (
        <KeysPressedContext.Provider value={keysPressed}>
            <KeysPressedDispatchContext.Provider value={dispatch}>
                {children}
            </KeysPressedDispatchContext.Provider>
        </KeysPressedContext.Provider>
    )
}