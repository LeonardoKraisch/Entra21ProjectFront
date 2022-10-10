import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, TextInput, Text } from "react-native-paper";
import useMoney from "../data/hooks/useMoney";



export default props => {
    const { addWallets, showToast } = useMoney()
    const [walletName, setWalletName] = useState("")
    const [walletDesc, setWalletDesc] = useState("")
    const [walletPassword, setWalletPassword] = useState("")

    const createWallet = async () => {
        await showToast(await addWallets({
            walletDesc,
            walletName,
            walletPassword
        }), "Create Wallet")
        props.pressProps()
    }

    return (
        <View style={styles.bodyContainer}>
            <Card style={styles.card}>
                <Card.Title titleStyle={{ color: '#FFF', fontSize: 20, fontWeight: "800" }} title="New Wallet" />
                <Card.Content style={styles.inputs}>
                    <TextInput style={styles.input} autoFocus={true} value={walletName} onChange={setWalletName} label={"What is the name of your wallet?"} />
                    <TextInput style={styles.input} value={walletDesc} onChange={setWalletDesc} label={"And the password?"} />
                    <TextInput style={styles.input} value={walletPassword} onChange={setWalletPassword} label={"Wanna add a description?"} />
                </Card.Content>
                <Button style={styles.buttonCreate} onPress={() => createWallet()}>
                    <Text style={styles.createText}>
                        Create
                    </Text>
                </Button>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        maxHeight: '100%'
    },
    card: {
        width: '100%',
        backgroundColor: '#35393550',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputs: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        marginVertical: 10
    },
    buttonCreate: {
        backgroundColor: '#3155d6',
        margin: 20
    },
    createText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
})