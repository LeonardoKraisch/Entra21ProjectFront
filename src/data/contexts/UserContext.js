import { useState, createContext } from "react";
import JWT from 'expo-jwt'
import Toast from 'react-native-toast-message'
import axios from "axios";

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('leonardokraisch@gmail.com')
    const [userCode, setUserCode] = useState('')

    const userInternalContext = {
        name,
        phone,
        email,
        userCode,
        signUp: async user => {
            var token = JWT.encode({
                userName: user.name,
                userPhone: user.phone,
                userEmail: user.email,
                userPasswd: user.password,
            }, 'segredo');
            try {
                const newUser = await axios.post("/user/signUp", { token })
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

            const token = JWT.encode({ email, password }, 'segredo')

            try {
                const userConnect = await axios.post("/user/login", { token })
                // const resToken = JWT.decode(userConnect.data.token, 'segredo')
                console.log(userConnect.data.token)
                // if (resToken.logged) {

                //     Toast.show({
                //         type: 'info',
                //         text1: 'Credenciais Validadas',
                //         text2: 'As credeciais foram Validadas'
                //     })

                //     setName(resToken.user.userName)
                //     setPhone(resToken.user.userPhone)
                //     setUserCode(resToken.user.userCode)
                //     setEmail(email)

                // } else {
                //     Toast.show({
                //         type: 'info',
                //         text1: 'Credenciais Invalidas',
                //         text2: 'As credeciais informadas não correspondem'
                //     })
                // }

            } catch (err) {
                Toast.show({
                    type: 'info',
                    text1: 'Erro de conexão',
                    text2: err.message
                })
            }
        },
            logOut: function () {
                setEmail('')
                setName('')
                setPhone('')
                setUserCode('')
            }
        }

return(
    <UserContext.Provider value={ userInternalContext } >
        { children }
    </UserContext.Provider >
)
}

export default UserContext