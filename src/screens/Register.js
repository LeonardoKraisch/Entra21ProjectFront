import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";
import Toast from 'react-native-toast-message'
import { TextInputMask } from 'react-native-masked-text'

import useUser from '../data/hooks/useUser'

export default props => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const refPhone = useRef()
    const refemail = useRef()
    const refPassword = useRef()
    const refConfPassword = useRef()
    
    const { signUp } = useUser()

    const validation = () => {
        if (name.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Invalid name',
                text2: 'The field is incomplete or has an invalid name.'
            })
        } else if (phone.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Invalid phone',
                text2: 'The field is incomplete or has an invalid phone.'
            })
        } else if (email.replace(" ", "") == "" || !email.includes('@')) {
            Toast.show({
                type: 'info',
                text1: 'Invalid email',
                text2: 'The field is incomplete or has an invalid email.'
            })
        } else if (password.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Invalid password',
                text2: 'The field is incomplete or has an invalid password.'
            })
        } else if (confPassword.replace(" ", "") == "") {
            Toast.show({
                type: 'info',
                text1: 'Invalid confimation password',
                text2: 'The field is incomplete.'
            })
        } else if (confPassword != password) {
            Toast.show({
                type: 'info',
                text1: 'Invalid password',
                text2: "Password and confirmation password don't match."
            })
        } else {
            signUp({ name, phone, email, password })
        }
        return <View/>
    }

    return (
        <View style={styles.containter}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                label="Name"
                onChangeText={setName}
                value={name}
                returnKeyType="next"
                onSubmitEditing={() => refPhone.current.getElement().focus()}
            />
            <TextInputMask
                style={styles.input}
                type={'cel-phone'}
                placeholder="Phone Number"
                placeholderTextColor={'#000'}
                onChangeText={setPhone}
                value={phone}
                keyboardType="phone-pad"
                returnKeyType="next"
                ref={refPhone}
                onSubmitEditing={() => refemail.current.focus()}

            />
            <TextInput
                style={styles.input}
                label="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                returnKeyType="next"
                ref={refemail}
                onSubmitEditing={() => refPassword.current.focus()}

            />
            <TextInput
                style={styles.input}
                label="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                returnKeyType="next"
                ref={refPassword}
                onSubmitEditing={() => refConfPassword.current.focus()}

            />
            <TextInput
                style={styles.input}
                label="Confirm Password"
                onChangeText={setConfPassword}
                value={confPassword}
                secureTextEntry={true}
                returnKeyType="send"
                ref={refConfPassword}
                onSubmitEditing={() => validation()}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={validation}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <TouchableOpacity
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
        backgroundColor: '#353935',
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: '#f2fa16',
        fontWeight: 'bold',
        margin: 2
    },
    input: {
        marginTop: 30,
        paddingHorizontal: 10,
        borderRadius: 4,
        width: '90%',
        height: 50,
        backgroundColor: '#F5FEFD',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#157de6',
        width: '90%',
        alignSelf: 'center',
        marginTop: 38,
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#F5FEFD',
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
        color: '#F5FEFD',
    },
    textUp: {
        color: '#f2fa16'
    }
})