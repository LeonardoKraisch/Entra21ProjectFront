import React, { useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Header from "../components/Header";

export default props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.containter}>
            <Header/>
            <View style={styles.body}>
                <Text>
                    Home
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: '#3C3C3C',
        width: '100%'
    }
})