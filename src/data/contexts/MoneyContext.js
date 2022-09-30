import React, { useState, createContext } from "react";
import Toast from 'react-native-toast-message'
import axios from "axios";

import moment from 'moment'

import useAnimation from "../hooks/useAnimation";
import useUser from "../hooks/useUser"

const MoneyContext = createContext({})

export const MoneyProvider = ({ children }) => {
    const { pressedPlus } = useAnimation()
    const { userCode } = useUser()

    const [balance, setBalance] = useState(0)
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [totalInc, setTotalInc] = useState(0)
    const [totalExp, setTotalExp] = useState(0)
    const [date, setDate] = useState(new Date())

    const [coin, setCoin] = useState('R$')

    const dateString = moment(date).format('YYYY[-]MM')
    const lastDay = (date) => {
        var month = new Date(date).getMonth() + 1
        var year = new Date(date).getFullYear()
        var numDays = 0
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                numDays = 31
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                numDays = 30;
                break;
            case 2:
                if (((year % 4 == 0) &&
                    !(year % 100 == 0))
                    || (year % 400 == 0))
                    numDays = 29;
                else
                    numDays = 28;
                break;
            default:
                console.warn("Invalid month.")
                break;
        }
        return numDays
    }

    const moneyInternalContext = {
        balance,
        coin,
        date,
        totalInc,
        totalExp,
        lastDay,
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
            const newQuery = await axios.post(`/${data.type == "+" ? "income" : "expenses"}/query`,
                { filterType: data.filterType, filter: data.filter, column: data.column })
            return newQuery.data.registers
        },

        fetchAllLaunches: async function () {
            try {
                const incomeArray = await moneyInternalContext.getRegisters({
                    type: "+",
                    filterType: "[]",
                    filter: [`${dateString}-1`, `${dateString}-${lastDay(date)}`],
                    column: "incDate"
                })
                const expensesArray = await moneyInternalContext.getRegisters({
                    type: "-",
                    filterType: "[]",
                    filter: [`${dateString}-1`, `${dateString}-${lastDay(date)}`],
                    column: "expDate"
                })

                var totalInc = await moneyInternalContext.calcTotal(incomeArray, 'incMoney')
                var totalExp = await moneyInternalContext.calcTotal(expensesArray, 'expMoney')

                setTotalExp(totalExp)
                setTotalInc(totalInc)
                setExpenses(expensesArray)
                setIncomes(incomeArray)

            } catch (e) {
                console.log(e.message)
            }
        },

        calcTotal: async (array, camp) => {
            var total = 0
            array.forEach((element) => {
                total = total + element[camp]
            })
            return total
        }

    }
    return (
        <MoneyContext.Provider value={moneyInternalContext}>
            {children}
        </MoneyContext.Provider >
    )
}

export default MoneyContext