import { useState, createContext, useCallback } from "react";
import Toast from 'react-native-toast-message'
import axios from "axios";
import JWT from "expo-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [userCode, setUserCode] = useState('')
    const userInternalContext = {
        name,
        phone,
        email,
        userCode,
        start: async () => {
            const userDataJson = await AsyncStorage.getItem('token')
            try {
                var userData = JSON.parse(userDataJson)
                const decoded = JWT.decode(userData, "segredo")
                if (decoded.logged) {
                setName(decoded.user.userName)
                setPhone(decoded.user.userPhone)
                setUserCode(decoded.user.userCode) 
                setEmail(decoded.user.userPhone)
                }
            } catch(e) {
                await AsyncStorage.removeItem('token')
                return
            }
        },
        signUp: async user => {
            try {
                const newUser = await axios.post("/user/signUp", {
                    newUser: {
                        userName: user.name,
                        userPhone: user.phone,
                        userEmail: user.email,
                        userPasswd: user.password
                    }
                })
                if (newUser.data.registered) {
                    setEmail(user.email)
                    setName(user.name)
                    setPhone(user.phone)
                    setUserCode(newUser.data.userCode)
                    Toast.show({
                        type: 'info',
                        text1: 'Registro confirmado',
                    })
                }
            } catch (err) {
                Toast.show({
                    type: 'info',
                    text1: 'Erro ao registrar',
                    text2: err.message
                })
            }
        },

        signIn: async (email, password) => {
            try {
                const userConnect = await axios.post("/user/login", {
                    user: {
                        email,
                        password
                    }
                })

                const decoded = JWT.decode(await userConnect.data.token, "segredo")
                if (decoded.logged) {

                    setName(decoded.user.userName)
                    setPhone(decoded.user.userPhone)
                    setUserCode(decoded.user.userCode)

                    Toast.show({
                        type: 'info',
                        text1: 'Login success',
                        text2: `Welcome ${name}!`
                    })
                    await AsyncStorage.setItem('token', JSON.stringify(userConnect.data.token))
                    setEmail(email)

                } else {
                    Toast.show({
                        type: 'info',
                        text1: 'Ivalid Token',
                        text2: 'Login required'
                    })
                }

            } catch (err) {
                Toast.show({
                    type: 'info',
                    text1: 'Erro de conexão',
                    text2: err.message
                })
            }
        },
        logout: async function () {
            setEmail('')
            setName('')
            setPhone('')
            setUserCode('')
            await AsyncStorage.removeItem('token')
        }
    }

    return (
        <UserContext.Provider value={userInternalContext}>
            {children}
        </UserContext.Provider >
    )
}

export default UserContext