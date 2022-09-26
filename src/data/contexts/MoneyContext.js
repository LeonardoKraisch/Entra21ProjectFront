import { useState, createContext } from "react";
import Toast from 'react-native-toast-message'
import axios from "axios";

import useAnimation from "../hooks/useAnimation";

const MoneyContext = createContext({})

export const MoneyProvider = ({ children }) => {
    const { pressedPlus } = useAnimation()

    const [balance, setBalance] = useState('2.000,00')
    const [coin, setCoin] = useState('R$')

    const moneyInternalContext = {
        balance,
        coin,
        send: async data => {
            var launch = {
                money: data.money,
                category: data.category,
                payments: data.payments,
                totalValue: data.totalValue,
                times: data.times,
                pending: data.pending,
                date: data.dateString,
                description: data.description
            }
            try {
                if (pressedPlus) {
                    // const newLaunch = await axios.post("", {launch})
                    console.log('+', launch)
                    Toast.show({
                        type: 'info',
                        text1: 'Successful launch!',
                        text2: 'You increased your balance.'
                    })

                } else {
                    // const newLaunch = await axios.post("", {launch})
                    console.log('-', launch)
                    Toast.show({
                        type: 'info',
                        text1: 'Successful launch!',
                        text2: 'You decreased your balance.'
                    })
                }
            } catch (e) {
                console.warn(e)
                Toast.show({
                    type: 'info',
                    text1: 'Your launch has failed!',
                    text2: 'Please, try again.'
                })
            }
        },

    }
    return (
        <MoneyContext.Provider value={moneyInternalContext}>
            {children}
        </MoneyContext.Provider >
    )
}

export default MoneyContext