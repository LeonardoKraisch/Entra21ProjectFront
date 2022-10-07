import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default props => {


    const [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 10000)
    }, [show])

    return (
        <LinearGradient colors={['#192b6a', '#3b348f', '#3d4986']} style={styles.container}>
            <View style={styles.buttonsCont}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Text>back</Text>
                </TouchableOpacity>
                <Animated.View style={{ opacity: show ? 1 : 0 }}>
                    <Text>In this session you can create</Text>
                </Animated.View>
                <TouchableOpacity onPress={() => setShow(true)} style>
                    <Text>?</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonsCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },

})