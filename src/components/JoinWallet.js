import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Button, TextInput, Text } from "react-native-paper";
import useMoney from "../data/hooks/useMoney";

export default props => {
    const { joinWallet, showToast } = useMoney()
    const [walletCode, setWalletCode] = useState("")
    const [walletPassword, setWalletPassword] = useState("")
    const refPassword = useRef()
    const join = async () => {
        await showToast(await joinWallet({
            walletCode: parseInt(walletCode),
            password: walletPassword
        }), "Join Wallet")
        props.pressProps()
        props.refresh()
    }

    return (
        <Card style={styles.card}>
            <Card.Title titleStyle={{ color: '#FFF', fontSize: 20, fontWeight: "800" }} title="Join Wallet" />
            <Card.Content style={styles.inputs}>
                <TextInput style={styles.input}
                    autoFocus={true}
                    value={walletCode}
                    onChangeText={setWalletCode}
                    label={"What is the code of the wallet?"}
                    returnKeyType="next"
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <TextInput style={styles.input}
                    value={walletPassword}
                    onChangeText={setWalletPassword}
                    label={"And the password?"}
                    returnKeyType="send"
                    ref={refPassword}
                    onSubmitEditing={() => join()}
                />
            </Card.Content>
            <Button style={styles.buttonCreate} onPress={() => join()}>
                <Text style={styles.createText}>
                    Join
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