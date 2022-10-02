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

    const [date, setDate] = useState(new Date())
    const [balance, setBalance] = useState(0)
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])

    const [totalInc, setTotalInc] = useState(0)
    const [totalExp, setTotalExp] = useState(0)
    const [allLaunches, setAllLaunches] = useState([])

    const [searchAllLaunches, setSearchAllLaunches] = useState([])
    const [searchIncomes, setSearchIncomes] = useState([])
    const [searchExpenses, setSearchExpenses] = useState([])
    const [totalSearch, setTotalSearch] = useState(0)
    const [totalSearchInc, setTotalSearchInc] = useState(0)
    const [totalSearchExp, setTotalSearchExp] = useState(0)

    const [coin, setCoin] = useState('R$')

    const dateString = date => moment(date).format('YYYY[-]MM')
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
        coin,
        date,
        incomes,
        expenses,
        totalInc,
        totalExp,
        balance,
        allLaunches,

        searchIncomes,
        searchExpenses,
        searchAllLaunches,
        totalSearchInc,
        totalSearchExp,
        totalSearch,

        lastDay,
        send: async data => {
            var money = data.money.replace("R$", "").replace(".", "").replace(",", ".")
            var table = pressedPlus ? "inc" : "exp"
            var launch = {}
            launch[`${table}Money`] = parseFloat(money),
                launch[`${table}Category`] = data.category,
                launch[`${table}PaymentMethod`] = parseInt(data.payments),
                launch[`${table}TotalPayment`] = data.totalValue,
                launch[`${table}Times`] = parseInt(data.times),
                launch[`${table}Pending`] = data.pending,
                launch[`${table}Date`] = data.dateString,
                launch[`${table}Description`] = data.description,
                launch['userCode'] = await userCode
            try {
                const newLaunch = await axios.post(`/${pressedPlus ? "income" : "expense"}/new`, { launch })
                if (await newLaunch.data.registered) {
                    Toast.show({
                        type: 'info',
                        text1: 'Successful launch!',
                        text2: 'You updated your balance.'
                    })
                } else {
                    console.log(newLaunch.data.registered)
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
            const newQuery = await axios.post(`/${data.type == "+" ? "income" : "expense"}/query`,
                { filterType: data.filterType, filter: data.filter, column: data.column })
            return newQuery.data.registers
        },

        fetchAllLaunches: async function () {
            try {
                const incomeArray = await moneyInternalContext.getRegisters({
                    type: "+",
                    filterType: "[]",
                    filter: [`${dateString(date)}-1`, `${dateString(date)}-${lastDay(date)}`],
                    column: "incDate"
                })
                const expensesArray = await moneyInternalContext.getRegisters({
                    type: "-",
                    filterType: "[]",
                    filter: [`${dateString(date)}-1`, `${dateString(date)}-${lastDay(date)}`],
                    column: "expDate"
                })

                const totalInc = await moneyInternalContext.calcTotal(incomeArray, 'incMoney')
                const totalExp = await moneyInternalContext.calcTotal(expensesArray, 'expMoney')

                setTotalExp(totalExp)
                setTotalInc(totalInc)
                setExpenses(expensesArray)
                setIncomes(incomeArray)

                setTotalSearchInc(totalInc)
                setTotalSearchExp(totalExp)
                setSearchIncomes(incomeArray)
                setSearchExpenses(expensesArray)

                const merged = await moneyInternalContext.mergeArrays(incomeArray, "incMoney", expensesArray, 'expMoney')
                setAllLaunches(merged)
                setSearchAllLaunches(merged)

                const total = totalInc - totalExp
                setBalance(total)
                setTotalSearch(total)

            } catch (e) {
                console.log(e.message)
            }
        },

        searchLaunches: async (dateSearch) => {
            try {
                if (dateSearch != date) {
                    const incomesSearch = await moneyInternalContext.getRegisters({
                        type: "+",
                        filterType: "[]",
                        filter: [`${dateString(dateSearch)}-1`, `${dateString(dateSearch)}-${lastDay(dateSearch)}`],
                        column: "incDate"
                    })
                    const totalIncome = await moneyInternalContext.calcTotal(incomesSearch, 'incMoney')

                    setSearchIncomes(await incomesSearch)
                    setTotalSearchInc(totalIncome)

                    const expensesSearch = await moneyInternalContext.getRegisters({
                        type: "-",
                        filterType: "[]",
                        filter: [`${dateString(dateSearch)}-1`, `${dateString(dateSearch)}-${lastDay(dateSearch)}`],
                        column: "expDate"
                    })
                    const totalExpense = await moneyInternalContext.calcTotal(expensesSearch, 'expMoney')

                    setSearchExpenses(await expensesSearch)
                    setTotalSearchExp(totalExpense)

                    const merged = await moneyInternalContext.mergeArrays(incomesSearch, "incMoney", expensesSearch, 'expMoney')
                    setSearchAllLaunches(merged)
                    const total = totalIncome - totalExpense
                    setTotalSearch(total)

                } else {
                    setSearchIncomes(incomes)
                    setTotalSearchInc(totalInc)
                    setSearchExpenses(expenses)
                    setTotalSearchExp(totalExp)
                    setSearchAllLaunches(allLaunches)
                    const total = totalInc - totalExp
                    setTotalSearch(total)
                }
            } catch (e) {
                console.log(e.message);
            }

        },

        calcTotal: async (array, camp) => {
            var total = 0
            array.forEach((element) => {
                total += element[camp]
            })
            return total
        },

        mergeArrays: async (array, camp, array2, camp2) => {
            var newArray = array2.map(element => ({ ...element }))
            newArray.map(element => element[camp2] = element[camp2] * -1)
            var all = [...newArray, ...array]
            console.log(all)
            return all
        },

    }


    return (
        <MoneyContext.Provider value={moneyInternalContext}>
            {children}
        </MoneyContext.Provider >
    )
}

export default MoneyContext