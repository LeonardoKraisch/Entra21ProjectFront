import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

export default props => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 5000)
    }, [show])

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => setShow(true)} style>
                    <Text>?</Text>
                </TouchableOpacity>
                <Animated.View style={{ opacity: show ? 1 : 0 }}>
                    <Text>In this session you can create</Text>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})