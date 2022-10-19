import { Animated } from "react-native";
import { useEffect, useRef } from "react";

import useAnimation from "../../data/hooks/useAnimation";

export default props => {

    const { show } = useAnimation()

    const rollSideAnim = useRef(new Animated.Value(187)).current 

    useEffect(() => {
        show ?

            Animated.timing(
                rollSideAnim,
                {
                    toValue: 390,
                    duration: 200,
                    useNativeDriver: false
                }
            ).start()

            :

            Animated.timing(
                rollSideAnim,
                {
                    toValue: 187,
                    duration: 200,
                    useNativeDriver: false
                }
            ).start()

    }, [show])




    const rollUpAnim = useRef(new Animated.Value(46)).current 

    useEffect(() => {
        show ?
            Animated.timing(
                rollUpAnim,
                {
                    toValue: 630,
                    duration: 200,
                    useNativeDriver: false
                }
            ).start()

            :

            Animated.timing(
                rollUpAnim,
                {
                    toValue: 46,
                    duration: 200,
                    useNativeDriver: false
                }
            ).start()
    }, [show])



    return (
        <Animated.View style={{ ...props.style, width: rollSideAnim, height: rollUpAnim }}>
            {props.children}
        </Animated.View>
    )
}
