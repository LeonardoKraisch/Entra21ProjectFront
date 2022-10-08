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
    const [allPendings, setAllPendings] = useState({})

    const [walltes, setWallets] = useState([])

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
        allPendings,

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

                    const total = await moneyInternalContext.recalBalance()
                    setBalance(total)
                    setTotalSearch(total)

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
        recalBalance: async () => {
            const total = totalInc - totalExp
            return total
        },
        getRegisters: async data => {
            data["userCode"] = userCode
            const newQuery = await axios.post(`/${data.type == "+" ? "income" : "expense"}/query`,
                data)
            return newQuery.data.registers
        },

        delRegister: async (data) => {
            try {
                const delConn = await axios.post(`/${data.type == "+" ? "income" : "expense"}/delete`,
                    { code: data.code })

                if (data.type == "+" && delConn.data.result.successful) {
                    var newPendings = incPendings.filter((pending) => {
                        return pending.incCode != data.code
                    })
                    setIncPendings(newPendings)

                } else if (data.type == "-" && delConn.data.result.successful) {
                    var newPendings = expPendings.filter((pending) => {
                        return pending.expCode != data.code
                    })
                    setExpPendings(newPendings)

                }
                await moneyInternalContext.generalPendings()
                return delConn.data.result
            } catch (e) {
                console.log(e.message, " - error in delRegister")
                Toast.show({
                    type: 'success',
                    text1: `error: ${e.message}`,
                })
            }


        },

        editRegister: async (data) => {
            try {
                const ediConn = await axios.post(`/${data.type == "+" ? "income" : "expense"}/edit`,
                    {
                        launch: {
                            code: data.code,
                            column: data.type == "+" ? { "incPending": false } : { "expPending": false }
                        }
                    })

                if (data.type == "+" && ediConn.data.result.successful) {
                    var newPendings = incPendings.filter((pending) => {
                        return pending.incCode != data.code
                    })
                    setIncPendings(newPendings)

                } else if (data.type == "-" && ediConn.data.result.successful) {
                    var newPendings = expPendings.filter((pending) => {
                        return pending.expCode != data.code
                    })
                    setExpPendings(newPendings)

                }
                ediConn.data.result.successful ?
                    Toast.show({
                        type: 'success',
                        text1: 'Edit successfull!',
                    })
                    :
                    Toast.show({
                        type: 'error',
                        text1: `error: ${ediConn.data.result.error}`,
                    })
                await moneyInternalContext.generalPendings()
            } catch (e) {
                Toast.show({
                    type: 'error',
                    text1: `error: ${e.message}`,
                })
                console.log(e.message, " - error in editRegister");
            }
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

                    await moneyInternalContext.balanceSetter(incomeArray, expensesArray)
                    await moneyInternalContext.getPendings()

                } else {
                    await moneyInternalContext.balanceSetter(incomes, expenses)
                    await moneyInternalContext.getPendings()

                }

            } catch (e) {
                console.log(e.message, " - error in fetch all launches")
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
                console.log(e.message, " - error i searchLaunches");
            }

        },

        calcTotal: async (array, camp) => {
            var total = 0
            try {
                array.forEach((element) => {
                    total += element[camp]
                })
                return total
            } catch (e) {
                return total
            }
        },

        mergeArrays: async (array, camp, array2, camp2) => {
            try {
                var newArray = array2.map(element => ({ ...element }))
                newArray.map(element => element[camp2] = element[camp2] * -1)
                var all = [...newArray, ...array]
                return all
            } catch (e) {
                return []
            }
        },

        getRegistersFiltered: async (filters) => {
            const obj = {
                type: filters.type,
                filterType: "...",
                filter: [
                    [filters.initDate, filters.endDate],
                    [filters.moneyFilter, filters.money, filters.moneyRange],
                    [filters.categoryFilter],
                    [filters.descriptionFilter]
                ]
            }
            console.log(filters, obj);
            return await moneyInternalContext.getRegisters(obj)
        },

        filterPlus: async (filter1, filter2) => {
            const filteredIncomes = await moneyInternalContext.getRegistersFiltered(filter1)
            const filteredExpenses = await moneyInternalContext.getRegistersFiltered(filter2)
            const filteredAllRegisters = await moneyInternalContext.mergeArrays(filteredIncomes, "incMoney", filteredExpenses, 'expMoney')

            await moneyInternalContext.searchSetter(await filteredIncomes, await filteredExpenses, filteredAllRegisters)
        },

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

                ))

                await moneyInternalContext.generalPendings()
            } catch (e) {
                console.log(e.message, " - error in getPendings")
            }
        },

        generalPendings: async () => {
            try {
                async function getAll() {
                    var newIncPendings = {}
                    for (let item of incPendings) {
                        if (newIncPendings[item.incDate] != null && newIncPendings[item.incDate][0].incDate == item.incDate) {
                            newIncPendings[item.incDate].push(item)
                        } else {
                            newIncPendings[item.incDate] = [item]
                        }
                    }
                    var newExpPendings = {}
                    for (let item of expPendings) {
                        if (newExpPendings[item.expDate] != null && newExpPendings[item.expDate][0].expDate == item.expDate) {
                            newExpPendings[item.expDate].push(item)
                        } else {
                            newExpPendings[item.expDate] = [item]
                        }
                    }
                    const merged = {}
                    Object.keys(newExpPendings).forEach((key) => {
                        merged[key] = []
                    })
                    Object.keys(newIncPendings).forEach((key) => {
                        merged[key] = []
                    })
                    Object.keys(merged).forEach((key) => {
                        try {
                            newIncPendings[key].forEach((item) => {
                                merged[key].push(item)
                            })

                        } catch { }
                        try {
                            newExpPendings[key].forEach((item) => {
                                merged[key].push(item)
                            })
                        } catch { }

                    })
                    return merged
                }
                setAllPendings(await getAll())
            } catch (e) {
                console.log(e.message, " - error in generalPendings")
                return {}
            }

        },

        addWallets: async () => {
            const newWallets = await axios.post("/wallet/new", { wallet })
            return newWallets.data.result
        },

        getWallets: async () => {
            const connWallets = await axios.post("/wallet/get", { userCode })
            return connWallets.data.registers
        },

        getAllRegistersToWallet: async (walletCode) => {
            try {
                const toWalletInc = await moneyInternalContext.getRegisters({
                    type: "+",
                    filterType: "=",
                    filter: userCode,//walletCode
                    column: "userCode"//walletCode
                })
                const toWalletExp = await moneyInternalContext.getRegisters({
                    type: "-",
                    filterType: "=",
                    filter: userCode,//walletCode
                    column: "userCode"//walletCode
                })
                return ([...toWalletInc, ...toWalletExp])
            } catch (e) {
                console.log(e.message, " - error in getAllRegistersToWallet")
                return e.message
            }
        },
        addCoWallet: async (wallet) => {
            wallet[userCode] = userCode
            const newCoWallet = await axios.post("/wallet/get", { wallet })
            return newCoWallet.data.results
        },
        showToast: async (results, action) =>{
            results.successful ?
            Toast.show({
                type: 'success',
                text1: `${action} successfull!`,
            })
            :
            Toast.show({
                type: 'success',
                text1: `error: ${results.error}`,
            })
        }
    }


    return (
        <MoneyContext.Provider value={moneyInternalContext} >
            {children}
        </MoneyContext.Provider >
    )
}

export default MoneyContext