import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";
import useUser from "../data/hooks/useUser";

export default props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useUser()

  const refPassword = useRef()

    return (
        <View style={styles.containter}>
            <View style={styles.animation}>
            
            </View>
            <View style={styles.login}>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoFocus={true}
                    returnKeyType="next"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    returnKeyType="send"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    ref={refPassword}
                    onSubmitEditing={() => signIn(email, password)}
                />


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signIn(email, password)}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>


                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.forgottenPass}
                        onPress={() =>props.navigation.navigate("Recover",{ email })}>
                        <Text style={styles.textRec}>Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.signUp}
                        onPress={() => props.navigation.navigate("Register")}>
                        <Text style={styles.textUp}>New here?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1
    },
    animation: {
        flex: 2,
        backgroundColor: '#32779E',
        width: '100%'
    },
    login: {
        flex: 3,
        backgroundColor: '#3C3C3C',
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        margin: 2
    },
    input: {
        marginTop: 30,
        padding: 7,
        borderRadius: 5,
        width: '90%',
        height: 50,
        backgroundColor: '#FFF',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#32779E',
        width: '90%',
        alignSelf: 'center',
        marginTop: 38,
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20
    },
    buttonRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        alignSelf: 'center'
    },
    textRec: {
        color: '#FFF',
    },
    textUp: {
        color: '#22EEFB'
    }
})