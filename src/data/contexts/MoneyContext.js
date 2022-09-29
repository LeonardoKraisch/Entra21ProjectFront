import React, { useState, createContext } from "react";
import Toast from 'react-native-toast-message'
import axios from "axios";

import useAnimation from "../hooks/useAnimation";
import useUser from "../hooks/useUser"

const MoneyContext = createContext({})

export const MoneyProvider = ({ children }) => {
    const { pressedPlus } = useAnimation()
    const { userCode, start } = useUser()

    const [balance, setBalance] = useState(0)
    const [total, setTotal] = useState(2000)
    const [expenses, setExpenses] = useState(300)
    const [coin, setCoin] = useState('R$')
    const moneyInternalContext = {
        balance,
        coin,
        total,
        expenses,
        getBalance: async () => {
            await start()
            setBalance(total - expenses)
        },
        send: async data => {
            var money = data.money.replace("R$", "").replace(".", "").replace(",", ".")
            var launch = {
                incMoney: parseFloat(money),
                incCategory: data.category,
                incPaymentMethod: parseInt(data.payments),
                incTotalPayment: data.totalValue,
                incTimes: parseInt(data.times),
                incPending: data.pending,
                incDate: data.dateString,
                incDescription: data.description,
                userCode: await userCode
            }
            try {
                const newLaunch = await axios.post(`/${pressedPlus ? "income" : "expenses"}/new`, { launch })
                if (newLaunch.data.registered) {
                    Toast.show({
                        type: 'info',
                        text1: 'Successful launch!',
                        text2: 'You updated your balance.'
                    })
                } else {
                    Toast.show({
                        type: 'info',
                        text1: 'Noooooooot Successful launch!',
                        text2: "You don't updated your balance."
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

        getRegisters: async data => {
            const newQuery = await axios.post(` /${data.type == "+" ? "income" : "expenses"}
                                                    /query`,
                { filterType: data.filterType, filter: data.filter,  column :data. column })
            return newQuery.data.registers
        },
        exemple: () => {
            console.log(getRegisters({
                type:"+",
                filterType: ">=",
                filter:"2022-09-1",
                column:"incDate"
            }))
        }







    }
    return (
        <MoneyContext.Provider value={moneyInternalContext}>
            {children}
        </MoneyContext.Provider >
    )
}

export default MoneyContext