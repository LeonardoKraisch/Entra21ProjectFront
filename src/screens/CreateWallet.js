import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button } from "react-native-paper";


export default props => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 10000)
    }, [show])

    return (
        <LinearGradient colors={['#192b6a', '#243e9c', '#3155d6']} style={styles.container}>
            <View style={styles.buttonsCont}>
                <View style={{ opacity: show ? 1 : 0 }}>
                    <Text>This is the Custom Wallet session, where you can create a special area to track specific type of launches.</Text>
                    <Text>For example, if you want to keep a portion of your income separate to save money;</Text>
                    <Text>Or if you live with other people and split the bills;</Text>
                    <Text>This wallet you can share with them and every member can launch and track their expenses.</Text>
                </View>
                <TouchableOpacity onPress={() => setShow(true)} style>
                    <Text>?</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={() => props.navigation.goBack()} style={styles.buttonBack}>
                <Text style={styles.buttonBackText}>
                    Back
                </Text>
            </Button>
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
    buttonBack: {
        flex: 1,
        right: 10,
        bottom: 10,
        position: 'absolute',
        backgroundColor: '#353935',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        elevation: 3
    },
    buttonBackText: {
        color: '#FFF'
    }

})