import React, { useState, createContext } from "react";
import Toast from 'react-native-toast-message'
import axios from "axios";

import moment from 'moment'

import useAnimation from "../hooks/useAnimation";
import useUser from "../hooks/useUser"

const MoneyContext = createContext({})

export const MoneyProvider = ({ children }) => {
    const { pressedPlus } = useAnimation()
    const { userCode, balance, setBalance, totalInc, setTotalInc, totalExp, setTotalExp } = useUser()

    const [date, setDate] = useState(new Date())


    const [incomes, setIncomes] = useState([null])
    const [expenses, setExpenses] = useState([])
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

    const [debtsState, refreshDebts] = useState(true)
    const [miniWalletState, refreshMiniWallet] = useState(true)

    const [wallets, setWallets] = useState([])

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
            if (data.wallet == 0) data.wallet = null
            launch[`${table}Money`] = parseFloat(money),
                launch[`${table}Category`] = data.category,
                launch[`${table}PaymentMethod`] = parseInt(data.payments),
                launch[`${table}TotalPayment`] = data.totalValue,
                launch[`${table}Times`] = parseInt(data.times),
                launch[`${table}Pending`] = data.pending,
                launch[`${table}Date`] = data.dateString,
                launch[`${table}Description`] = data.description,
                launch['user'] = await userCode
            launch['wallet'] = await data.wallet
            try {
                const newLaunch = await axios.post(`/${pressedPlus ? "income" : "expense"}/new`, { launch })
                if (await newLaunch.data.registered) {
                    if (pressedPlus) {
                        if (launch["incPending"]) {
                            setIncPendings([...incPendings, launch])
                            setAllPendings(await moneyInternalContext.generalPendings())
                        } else {
                            setIncomes([...incomes, launch])
                            setTotalInc(totalInc + await launch['incMoney'])
                        }
                    } else {
                        if (launch["expPending"]) {
                            setExpPendings([...expPendings, launch])
                            setAllPendings(await moneyInternalContext.generalPendings())
                        } else {
                            setExpenses([...expenses, launch])
                            setTotalExp(totalExp + await launch['expMoney'])
                        }
                    }

                    setAllLaunches([...allLaunches, launch])

                    const total = await moneyInternalContext.recalBalance()
                    setBalance(await moneyInternalContext.getUserMoney())
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
                return null
            } catch (e) {
                console.log(e.message, "error in send")
                Toast.show({
                    type: 'info',
                    text1: 'Your launch has failed!',
                    text2: 'Please, try again.'
                })
                return null
            }
        },

        fetchAllLaunches: async function () {
            try {
                if (incomes == '' || expenses == '') {
                    const incomeArray = await moneyInternalContext.getRegisters({
                        type: "+",
                        filter: {
                            date:
                            {
                                type: "[]",
                                initDate: `${dateString(date)}-1`,
                                endDate: `${dateString(date)}-${lastDay(date)}`
                            }
                        }
                    })
                    const expensesArray = await moneyInternalContext.getRegisters({
                        type: "-",
                        filter: {
                            date:
                            {
                                type: "[]",
                                initDate: `${dateString(date)}-1`,
                                endDate: `${dateString(date)}-${lastDay(date)}`
                            }
                        }
                    })
                    moneyInternalContext.getPendings()
                    await moneyInternalContext.balanceSetter(incomeArray, expensesArray)
                    moneyInternalContext.refreshUserMoney()

                } else {
                    moneyInternalContext.getPendings()
                    await moneyInternalContext.balanceSetter(incomes, expenses)
                    moneyInternalContext.refreshUserMoney()

                }

            } catch (e) {
                console.log(e.message, " - error in fetch all launches")
            }
        },

        recalBalance: async () => {
            const total = totalInc - totalExp
            return total
        },

        getRegisters: async data => {
            if (data.wallet == undefined)
                data["user"] = { code: userCode }
            const newQuery = await axios.post(`/${data.type == "+" ? "income" : "expense"}/query`,
                data)
            return newQuery.data.registers
        },

        delRegister: async (data) => {

            try {
                const delConn = await axios.post(`/${data.type == "+" ? "income" : "expense"}/delete`,
                    { code: data.code })

                if (data.type == "+" && delConn.data.result.successfull) {
                    if (data.pending) {
                        var newPendings = incPendings.filter((pending) => {
                            return pending.incCode != data.code
                        })
                        setIncPendings(newPendings)

                    } else {
                        var newLaunches = incomes.filter((launch) => {
                            return launch.incCode != data.code
                        })
                        setIncomes(newLaunches)
                        await moneyInternalContext.balanceSetter(newLaunches, expenses)
                    }

                } else if (data.type == "-" && delConn.data.result.successfull) {
                    if (data.pending) {
                        var newPendings = expPendings.filter((pending) => {
                            return pending.expCode != data.code
                        })
                        setExpPendings(newPendings)

                    } else {
                        var newLaunches = expenses.filter((launch) => {
                            return launch.expCode != data.code
                        })
                        setIncomes(newLaunches)
                        await moneyInternalContext.balanceSetter(incomes, newLaunches)
                    }

                }

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
                            column: data.type == "+" ? { "incPending": false } : { "expPending": false },
                            user: userCode
                        }
                    })

                if (data.type == "+" && ediConn.data.result.successfull) {
                    if (data.pending) {
                        var newPendings = incPendings.filter((pending) => {
                            return pending.incCode != data.code
                        })
                        setIncPendings(newPendings)

                    } else {
                        var newLaunches = expenses.filter((launch) => {
                            return launch.expCode != data.code
                        })
                        setIncomes(newLaunches)
                        await moneyInternalContext.balanceSetter(incomes, newLaunches)
                    }

                } else if (data.type == "-" && ediConn.data.result.successfull) {
                    if (data.pending) {
                        var newPendings = expPendings.filter((pending) => {
                            return pending.expCode != data.code
                        })
                        setExpPendings(newPendings)

                    } else {
                        var newLaunches = expenses.filter((launch) => {
                            return launch.expCode != data.code
                        })
                        setIncomes(newLaunches)
                        await moneyInternalContext.balanceSetter(incomes, newLaunches)
                    }

                }

                
                return ediConn.data.result
            } catch (e) {
                Toast.show({
                    type: 'error',
                    text1: `error: ${e.message}`,
                })
                console.log(e.message, " - error in editRegister");
            }
        },

        balanceSetter: async (arr1, arr2) => {

            const merged = await moneyInternalContext.mergeArrays(arr1, "incMoney", arr2, 'expMoney')
            setAllLaunches(merged)
            setBalance(await moneyInternalContext.getUserMoney())
            await moneyInternalContext.searchSetter(arr1, arr2, merged)
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
                    const incomeArray = await moneyInternalContext.getRegisters({
                        type: "+",
                        filter: {
                            date:
                            {
                                type: "[]",
                                initDate: `${dateString(dateSearch)}-1`,
                                endDate: `${dateString(dateSearch)}-${lastDay(dateSearch)}`
                            }
                        }
                    })
                    const expensesArray = await moneyInternalContext.getRegisters({
                        type: "-",
                        filter: {
                            date:
                            {
                                type: "[]",
                                initDate: `${dateString(dateSearch)}-1`,
                                endDate: `${dateString(dateSearch)}-${lastDay(dateSearch)}`
                            }
                        }
                    })


                    const merged = await moneyInternalContext.mergeArrays(incomeArray, "incMoney", expensesArray, 'expMoney')

                    moneyInternalContext.searchSetter(incomeArray, expensesArray, merged)

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

        filterPlus: async (filterIncomes, filterExpenses) => {
            const filteredIncomes = await moneyInternalContext.getRegisters(filterIncomes)
            const filteredExpenses = await moneyInternalContext.getRegisters(filterExpenses)
            const filteredAllRegisters = await moneyInternalContext.mergeArrays(filteredIncomes, "incMoney", filteredExpenses, 'expMoney')

            await moneyInternalContext.searchSetter(filteredIncomes, filteredExpenses, filteredAllRegisters)
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

                setAllPendings(await moneyInternalContext.generalPendings())
                return allPendings
            } catch (e) {
                console.log(e.message, " - error in getPendings")
            }
        },
        // [Object.keys(allPendings)[0]][0]
        generalPendings: async () => {
            try {
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

            } catch (e) {
                console.log(e.message, " - error in generalPendings")
                return {}
            }

        },

        addWallets: async (wallet) => {
            wallet['walletTotalIncomes'] = 0
            wallet['walletTotalExpenses'] = 0
            const newWallets = await axios.post("/wallet/new", {
                wallet,
                userCode
            })
            return newWallets.data.result
        },

        getWallets: async () => {
            try {
                const connWallets = await axios.post("/wallet/get", { userCode })
                let wallets = connWallets.data.registers
                wallets.forEach((wallet, code) => {
                    if (wallet.favorite) {
                        wallets.splice(code, 1)
                        wallets.unshift(wallet)
                    }
                })
                return connWallets.data.registers
            } catch (e) {
                console.log(e.message, "error in wallet")
            }
        },

        getAllRegistersToWallet: async (walletCode) => {
            try {
                const toWalletInc = await moneyInternalContext.getRegisters({
                    type: "+",
                    filter: {
                        wallet: { code: walletCode }
                    }
                })
                const toWalletExp = await moneyInternalContext.getRegisters({
                    type: "-",
                    filter: {
                        wallet: { code: walletCode }
                    }
                })
                const merged = await moneyInternalContext.mergeArrays(toWalletInc, "incMoney", toWalletExp, 'expMoney')

                return ({ toWalletInc, toWalletExp, merged })
            } catch (e) {
                console.log(e.message, " - error in getAllRegistersToWallet")
                return e.message
            }
        },
        joinWallet: async (wallet) => {
            wallet["userCode"] = userCode
            const newCoWallet = await axios.post("/wallet/join", { wallet })
            return newCoWallet.data.result
        },
        showToast: async (result, action) => {
            result.successfull ?
                Toast.show({
                    type: 'success',
                    text1: `${action} successfull!`,
                })
                :
                Toast.show({
                    type: 'success',
                    text1: `error: ${result.error}`,
                })
            console.log(result.error);
        },
        getMonthlyBalance: async () => {
            const MonthlyIncomes = await moneyInternalContext.getRegisters({
                type: "+",
                filter: {
                    category: {
                        type: "==",
                        value: "MonthlyBalance"
                    }
                }
            })
            const MonthlyExpenses = await moneyInternalContext.getRegisters({
                type: "-",
                filter: {
                    category: {
                        type: "==",
                        value: "MonthlyBalance"
                    }
                }
            })
            const MonthlyBalances = [...MonthlyIncomes, ...MonthlyExpenses]

            for (const launch in MonthlyExpenses) {
                try {
                    if (parseInt(MonthlyBalances[launch].split("-")[0])
                        >
                        parseInt(MonthlyBalances[launch + 1].split("-")[0])) {
                        const year = MonthlyBalances[launch]
                        MonthlyBalances[launch] = MonthlyBalances[launch + 1]
                        MonthlyBalances[launch + 1] = MonthlyBalances[launch]
                    }
                } catch {

                }
            }
            const savings = []
            MonthlyBalances.forEach(async register => {



                const mounthlys = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
                var value = 0
                var date = ""
                try {
                    value = register.incMoney
                    date = register.incDate
                } catch {

                    value = register.expMoney
                    date = register.expDate
                }
                var datesCamps = date.split("-")
                savings.push({
                    month: `${datesCamps[0]}-${mounthlys[datesCamps[1] - 1]}`,
                    value
                })
                return { savings, MonthlyBalances }
            })


        },
        getUserMoney: async () => {
            try {
                const userConn = await axios.post(`/user/queryMoney`,
                    { userCode })
                return userConn.data.userMoney
            } catch (e) {
                console.log("error in getUserMoney", e.message)
            }
        },
        refreshUserMoney: async () => {
            const userConn = await axios.post(`/user/refreshUserMoney`,
                { userCode })
            setBalance(userConn.data.userMoney)
            setTotalInc(userConn.data.userTotalIncomes)
            setTotalExp(userConn.data.userTotalExpenses)
        }
    }

    return (
        <MoneyContext.Provider value={moneyInternalContext} >
            {children}
        </MoneyContext.Provider >
    )
}

export default MoneyContext