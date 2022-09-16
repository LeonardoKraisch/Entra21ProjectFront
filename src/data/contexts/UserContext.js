import { useState, createContext } from "react";
import JWT from 'expo-jwt'
import Toast from 'react-native-toast-message'

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
        signUp: async user => {
            var token = await JWT.encode({
                userName: user.name,
                userPhone: user.phone,
                userEmail: user.email,
                userPasswd: user.password,
            }, 'segredo');

            fetch("https://e21project-be.herokuapp.com/user/signUp",
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json', 'content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                })
                .then(() => Toast.show({
                    type: 'info',
                    text1: 'Registro confirmado',
                }))
                .catch(() => Toast.show({
                    type: 'info',
                    text1: 'Erro ao registrar',
                }))
        }
    }

    return (
        <UserContext.Provider value={userInternalContext}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext