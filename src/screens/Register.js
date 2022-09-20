import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import { TextInputMask } from 'react-native-masked-text'

import useUser from '../data/hooks/useUser'

export default props => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const { signUp } = useUser()

    const validation = () => {
        if (name.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Nome Inválido',
                text2: 'Informe um nome válido'
            })
        } else if (phone.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Telefone Invalido',
                text2: 'Informe um telefone válido'
            })
        } else if (email.replace(" ", "") == "" || !email.includes('@')) {
            Toast.show({
                type: 'info',
                text1: 'Email Inválido',
                text2: 'Informe um email valido'
            })
        } else if (password.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Senha Inválida',
                text2: 'Informe uma senha válida'
            })
        } else if (confPassword.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Senha de confirmação Inválida',
                text2: 'Informe uma senha de confirmação válida'
            })
        } else if (confPassword != password) {
            Toast.show({
                type: 'info',
                text1: 'Senha de confirmação diferente',
                text2: 'A senha de confirmação não é igual'
            })
        } else {
            signUp({ name, phone, email, password })
        }
    }

    return (
        <View style={styles.containter}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
                value={name}
            />
            <TextInputMask
                style={styles.input}
                type={'cel-phone'}
                placeholder="Phone Number"
                onChangeText={setPhone}
                value={phone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={setConfPassword}
                value={confPassword}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={validation}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={styles.textUp}>Already have an account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        backgroundColor: '#3C3C3C',
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
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