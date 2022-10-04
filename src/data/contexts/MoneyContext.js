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

    const [incPendings, setIncPendings] = useState([])
    const [expPendings, setExpPendings] = useState([])

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
        balance,
        incomes,
        expenses,
        totalInc,
        totalExp,
        allLaunches,

        searchIncomes,
        searchExpenses,
        searchAllLaunches,
        totalSearchInc,
        totalSearchExp,
        totalSearch,

        incPendings,
        expPendings,

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

                    if (pressedPlus) {
                        if (launch["incPending"]) {
                            setIncPendings([...incPendings, launch])
                        } else {
                            setIncomes([...incomes, launch])
                            setTotalInc(totalInc + await launch['incMoney'])
                        }
                    } else {
                        if (launch["expPending"]) {
                            setExpPendings([...expPendings, launch])
                        } else {
                            setExpenses([...expenses, launch])
                            setTotalExp(totalExp + await launch['expMoney'])
                        }
                    }
                    
                    setAllLaunches([...allLaunches, launch])
                    const total = totalInc - totalExp
                    setBalance(total)
                    setTotalSearch(balance)

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
            const newQuery = await axios.post(`/${data.type == "+" ? "income" : "expense"}/query`,
                data)
            return newQuery.data.registers
        },

        delRegister: async (data) =>{
            const delConn = await axios.post(`/${data.type == "+" ? "income" : "expense"}/`,
                data)
        },

        fetchAllLaunches: async function () {
            try {
                if (incomes == '' || expenses == '') {
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

                    moneyInternalContext.balanceSetter(incomeArray, expensesArray)
                    moneyInternalContext.getPendings()

                } else {
                    moneyInternalContext.balanceSetter(incomes, expenses)

                }

            } catch (e) {
                console.log(e.message)
            }
        },

        balanceSetter: async (arr1, arr2) => {

            const totalInc = await moneyInternalContext.calcTotal(arr1, 'incMoney')
            const totalExp = await moneyInternalContext.calcTotal(arr2, 'expMoney')

            setTotalInc(totalInc)
            setTotalExp(totalExp)
            setIncomes(arr1)
            setExpenses(arr2)

            const merged = await moneyInternalContext.mergeArrays(arr1, "incMoney", arr2, 'expMoney')
            setAllLaunches(merged)

            const total = totalInc - totalExp
            setBalance(total)
            moneyInternalContext.searchSetter(arr1, arr2, merged)
        },

        searchSetter: async (arr1, arr2, arr3) => {

            const totalIncome = await moneyInternalContext.calcTotal(arr1, 'incMoney')
            const totalExpense = await moneyInternalContext.calcTotal(arr2, 'expMoney')

            setSearchIncomes(arr1)
            setSearchExpenses(arr2)
            setTotalSearchInc(totalIncome)
            setTotalSearchExp(totalExpense)

            setSearchAllLaunches(arr3)

            const total = totalIncome - totalExpense
            setTotalSearch(total)
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

                    const expensesSearch = await moneyInternalContext.getRegisters({
                        type: "-",
                        filterType: "[]",
                        filter: [`${dateString(dateSearch)}-1`, `${dateString(dateSearch)}-${lastDay(dateSearch)}`],
                        column: "expDate"
                    })

                    const merged = await moneyInternalContext.mergeArrays(incomesSearch, "incMoney", expensesSearch, 'expMoney')

                    moneyInternalContext.searchSetter(incomesSearch, expensesSearch, merged)

                } else {
                    moneyInternalContext.searchSetter(incomes, expenses, allLaunches)

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
            return all
        },

        getLaunchesPluxFilter: async (filters) => {
            return await moneyInternalContext.getRegisters({
                type: filters.type,
                filterType: "...",
                filter: [
                    [filters.initDate, filters.endDate],
                    [filters.moneyFilter, filters.money, filters.moneyRange],
                    [filters.categoryFilter],
                    [filters.descriptionFilter]
                ]
            })

        },

        // filterPlus: async (filtersInc, filtersExp) => {
        //     var filtered = moneyInternalContext.balanceSetter(await moneyInternalContext.getLaunchesPluxFilter(filtersInc), await moneyInternalContext.getLaunchesPluxFilter(filtersExp))

        // },

        getPendings: async () => {
            try {

                setIncPendings(await moneyInternalContext.getRegisters(
                    {
                        type: "+",
                        pending: true
                    }
                ))
                setExpPendings(await moneyInternalContext.getRegisters(
                    {
                        type: "-",
                        pending: true
                    }

                )
                )
            } catch (e) {
                console.log(e.mesage)
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