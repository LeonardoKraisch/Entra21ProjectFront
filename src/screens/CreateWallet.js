import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";


export default props => {

    const [show, setShow] = useState(false)

    return (
        <LinearGradient colors={['#192b6a', '#243e9c', '#3155d6']} style={styles.container}>
            <View style={styles.helpCont}>
                <TouchableOpacity onPress={() => setShow(true)} style={styles.buttonHelp}>
                    <Text style={styles.buttonHelpText}>?</Text>
                </TouchableOpacity>
            </View>

            <Button onPress={() => props.navigation.goBack()} style={styles.buttonBack}>
                <Text style={styles.buttonBackText}>
                    Back
                </Text>
            </Button>
            <Modal visible={show}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShow(false)}>
                <View style={styles.modalView}>
                    <Card style={styles.textHelpModal}>
                        <Text style={styles.textModal}>This is the Custom Wallet session!</Text>
                        <Text style={styles.textModal}>Here you can choose to track specific type of launches and even invite other people to participate.</Text>
                        <Text style={styles.textModal}>For example, if you want to keep a part of your incomes separate to save up;</Text>
                        <Text style={styles.textModal}>Or if you live with other people and have to split the bills.</Text>
                        <Text style={styles.textModal}>You can share this wallet with whoever you want, and every member can launch and track expenses.</Text>
                        <TouchableOpacity onPress={() => setShow(false)} style={styles.okModalButton}>
                            <MaterialIcons size={35} name="done" color="green" />
                        </TouchableOpacity>
                    </Card>
                </View>
            </Modal>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    helpCont: {
        height: '10%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonHelp: {
        height: 40,
        width: 40,
        backgroundColor: '#353935',
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        elevation: 3
    },
    textHelpModal: {
        width: '80%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textModal: {
        padding: 5,
        fontSize: 17
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonHelpText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    okModalButton: {
        alignSelf: 'flex-end',
        marginBottom: 5
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