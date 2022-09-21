import { useState, createContext } from "react";

const AnimationContext = createContext({})

export const AnimationProvider = ({ children }) => {
    const [pressedPlus, setPressedPlus] = useState(false)
    const [pressedMinus, setPressedMinus] = useState(false)
    const [show, setShow] = useState(false)

    const animationInternalContext = {
        pressedPlus,
        pressedMinus,
        show,
        pressPlus: () => {
            if (show == false) {
                setShow(true)
            }
            setPressedPlus(true)
            setPressedMinus(false)
        },
        pressMinus: () => {
            if (show == false) {
                setShow(true)
            }
            setPressedMinus(true)
            setPressedPlus(false)
        },
        close: () => {
            setShow(false)
            setPressedMinus(false)
            setPressedPlus(false)
        }

    }
    return (
        <AnimationContext.Provider value={animationInternalContext}>
            {children}
        </AnimationContext.Provider>
    )
}

export default AnimationContext