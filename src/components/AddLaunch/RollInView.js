import { Animated } from "react-native";
import { useEffect, useRef } from "react";

import useAnimation from "../../data/hooks/useAnimation";

export default props => {

    const { show } = useAnimation()

    const rollSideAnim = show ? useRef(new Animated.Value(190)).current : useRef(new Animated.Value(390)).current

    useEffect(() => {
        show ?

            Animated.timing(
                rollSideAnim,
                {
                    toValue: 390,
                    duration: 150,
                    useNativeDriver: false
                }
            ).start()

            :

            Animated.timing(
                rollSideAnim,
                {
                    toValue: 187,
                    duration: 150,
                    useNativeDriver: false
                }
            ).start()

    }, [show])




    const rollUpAnim = show ? useRef(new Animated.Value(46)).current : useRef(new Animated.Value(630)).current

    useEffect(() => {
        show ?
            Animated.timing(
                rollUpAnim,
                {
                    toValue: 630,
                    duration: 150,
                    useNativeDriver: false
                }
            ).start()

            :

            Animated.timing(
                rollUpAnim,
                {
                    toValue: 46,
                    duration: 150,
                    useNativeDriver: false
                }
            ).start()
    }, [show])



    return (
        <Animated.View style={{ ...props.style, width: rollSideAnim || 187, height: rollUpAnim || 46 }}>
            {props.children}
        </Animated.View>
    )
}
