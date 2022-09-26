import { useState, createContext } from "react";
import Toast from 'react-native-toast-message'
import axios from "axios";

import useAnimation from "../hooks/useAnimation";
import useUser from "../hooks/useUser"

const MoneyContext = createContext({})

export const MoneyProvider = ({ children }) => {
    const { pressedPlus } = useAnimation()
    const { userCode } = useUser()

    const [balance, setBalance] = useState('2.000,00')
    const [coin, setCoin] = useState('R$')
    const [total, setTotal] = useState(0)
    const moneyInternalContext = {
        balance,
        coin,
        send: async data => {
            var launch = {
                incMoney: data.money,
                incCategory: data.category,
                incPayments: data.payments,
                incTotalValue: data.totalValue,
                incTimes: data.times,
                incPending: data.pending,
                incDate: data.dateString,
                incDescription: data.description,
                userCode: await userCode
            }
            try {
                if (pressedPlus) {
                    const newLaunch = await axios.post("/income/new", {launch})
                    if (newLaunch.data.registered) {
                        console.log('+', launch)
                        Toast.show({
                            type: 'info',
                            text1: 'Successful launch!',
                            text2: 'You increased your balance.'
                        })
                    } else {
                        Toast.show({
                            type: 'info',
                            text1: 'Noooooooot Successful launch!',
                            text2: "You don't increased your balance."
                        }) 
                    }

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