import { useState, createContext } from "react";
import Toast from 'react-native-toast-message'
import axios from "axios";
import JWT from "expo-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage"

const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [userCode, setUserCode] = useState(-1)
    const [balance, setBalance] = useState(0)
    const [totalInc, setTotalInc] = useState(0)
    const [totalExp, setTotalExp] = useState(0)

    const userInternalContext = {
        name,
        phone,
        email,
        userCode,

        balance, 
        totalInc, 
        totalExp, 
        
        setBalance, 
        setTotalInc, 
        setTotalExp,
        
        start: async () => {
            const userDataJson = await AsyncStorage.getItem('token')

            if (userDataJson !== null) {
                try {
                    var userData = JSON.parse(userDataJson)
                    const decoded = JWT.decode(userData, "segredo", { timeSkew: 300 })
                    if (decoded.logged) {
                        Toast.show({
                            type: 'success',
                            text1: 'Login successfull!',
                        })
                        setName(decoded.user.userName)
                        setPhone(decoded.user.userPhone)
                        setUserCode(decoded.user.userCode)
                        setEmail(decoded.user.userPhone)

                        
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Invalid Credencials!',
                        })
                        await AsyncStorage.removeItem('token')
                        return
                    }
                } catch (e) {
                    console.log(e)
                    await AsyncStorage.removeItem('token')
                    return
                }
            } else {
                return
            }
        },
        signUp: async user => {
            try {
                const newUser = await axios.post("/user/signUp", {
                    newUser: {
                        userCode,
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
                    setTotalInc(0)
                    setTotalExp(0)
                    setBalance(0)

                    
                    setUserCode(newUser.data.userCode)
                    Toast.show({
                        type: 'success',
                        text1: 'Your account was successfully created!',
                    })
                } else {Toast.show({
                    type: 'error',
                    text1: newUser.data.result.error
                })
                console.log("else error",newUser.data.result.error)}

            } catch (err) {
                Toast.show({
                    type: 'error',
                    text1: 'An error has occurred. Please, try again.',
                    text2: err.message
                })
                console.log("catch error", err.message)
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

                try {
                    const decoded = JWT.decode(await userConnect.data.token, "segredo", { timeSkew: 300 })
                    if (decoded.logged){
                    setName(decoded.user.userName)
                    setPhone(decoded.user.userPhone)
                    setUserCode(decoded.user.userCode)
                    setTotalInc(decoded.user.userTotalIncomes)
                    setTotalExp(decoded.user.userTotalExpenses)
                    setBalance(decoded.user.userMoney)
                    await AsyncStorage.setItem('token', JSON.stringify(userConnect.data.token))
                    setEmail(email)

                    Toast.show({
                        type: 'success',
                        text1: 'Login success',
                        text2: 'Welcome!'
                    })}else{
                        Toast.show({
                            type: 'error',
                            text1: decoded.error
                        })

                    }
                } catch (e) {
                        Toast.show({
                            type: 'error',
                            text1: "Conta não cadastrada"
                        })
                    

                }

            } catch (err) {
                Toast.show({
                    type: 'info',
                    text1: 'Connection error. Please, try again.',
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
        },
        sendRecoverEmail : async (userEmail) => {
            try{
            const recoverConn = await axios.post("/user/recoverPasswd", {
                user:{
                    userEmail: userEmail
                }
            })
            recoverConn.data.results
            return recoverConn.data.results
        }catch(e){
            console.log(e.message)
        }
        }
    }

    return (
        <UserContext.Provider value={userInternalContext}>
            {children}
        </UserContext.Provider >
    )
}

export default UserContext