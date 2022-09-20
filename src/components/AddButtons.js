import { View, TouchableOpacity, Text, StyleSheet, Animated, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

import Inputs from "./Inputs";

export default props => {

    const [show, setShow] = useState(false)

    const RollInView = (props) => {

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
                        toValue: 190,
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
            <Animated.View style={{ ...props.style, width: rollSideAnim, height: rollUpAnim }}>
                {props.children}
            </Animated.View>
        )
    }

    return (
        <RollInView style={styles.container}>
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={() => setShow(true)}
                    style={styles.buttonPlus}>
                    <Entypo name="circle-with-plus"  size={30} color='#32c622' />
                    <Text style={{ color: '#32c622', fontSize: 25 }}>$</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#333', width: 4 }}></View>
                <TouchableOpacity style={styles.buttonMinus}>
                    <Entypo name="circle-with-minus" size={30} color='#c63222' />
                    <Text style={{ color: '#c63222', fontSize: 25 }}>$</Text>
                </TouchableOpacity>
            </View>
            {show ?
                <View style={{ flexDirection: 'column-reverse', justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => setShow(false)} style={styles.buttonClose}>
                        <Entypo name="circle-with-cross" size={25} color='#c63222' />
                    </TouchableOpacity>
                    <Inputs />
                </View>
                :
                false
            }
        </RollInView >
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: '100%',
        backgroundColor: '#333',
        justifyContent: "space-between",
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingTop: 5,
        paddingLeft: 5,
        borderTopStartRadius: 36,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        paddingBottom: 1,
        borderColor: '#32779E',

    },
    containerButton: {
        flexDirection: 'row',
        width: 180,
        backgroundColor: '#333',
        justifyContent: "space-between",
        borderTopStartRadius: 40
    },
    buttonPlus: {
        backgroundColor: '#34F9b2',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 28,
        flex: 1,
        borderWidth: 3,
        borderColor: '#32c622',
        flexDirection: 'row'
    },
    buttonMinus: {
        backgroundColor: '#f64232',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 3,
        borderColor: '#c63222',
        flexDirection: 'row'
    },
    buttonClose: {
        backgroundColor: '#f64232',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#c63222',
        flexDirection: 'row'
    }

})