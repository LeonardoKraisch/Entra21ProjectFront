import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, TextInput, Text } from "react-native-paper";
import useMoney from "../data/hooks/useMoney";

export default props => {
    const { addWallets, showToast } = useMoney()
    const [walletName, setWalletName] = useState("")
    const [walletDesc, setWalletDesc] = useState("")
    const [walletPassword, setWalletPassword] = useState("")
    const refPassword = useRef()
    const refDescription = useRef()

    const createWallet = async () => {
        await showToast(await addWallets({
            walletDesc,
            walletName,
            walletPasswd: walletPassword
        }), "Create Wallet")
        props.pressProps()
        props.refresh()
    }

    return (
        <Card style={styles.card}>
            <Card.Title titleStyle={{ color: '#FFF', fontSize: 20, fontWeight: "800" }} title="New Wallet" />
            <Card.Content style={styles.inputs}>
                <TextInput style={styles.input}
                    autoFocus={true}
                    value={walletName}
                    onChangeText={setWalletName}
                    label={"What is the name of your wallet?"}
                    returnKeyType="next"
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <TextInput style={styles.input}
                    value={walletDesc}
                    onChangeText={setWalletDesc}
                    label={"And the password?"}
                    ref={refPassword}
                    returnKeyType="next"
                    onSubmitEditing={() => refDescription.current.focus()}
                />
                <TextInput style={styles.input}
                    value={walletPassword}
                    onChangeText={setWalletPassword}
                    label={"Wanna add a description?"}
                    ref={refDescription}
                    returnKeyType="send"
                />
            </Card.Content>
            <Button style={styles.buttonCreate} onPress={() => createWallet()}>
                <Text style={styles.createText}>
                    Create
                </Text>
            </Button>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#35393570',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 4
        },
        shadowOpacity: 0.50,
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