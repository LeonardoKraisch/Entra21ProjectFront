import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import useMoney from "../data/hooks/useMoney";
import WalletFilters from "../components/Wallet/WalletFilters";
import Report from "../components/Wallet/Report";


export default props => {
    const { incomes, expenses, allLaunches, searchAllLaunches, searchIncomes,
        searchExpenses, totalSearch, totalSearchInc, totalSearchExp, searchLaunches } = useMoney()

    useEffect(() => {
        async function fetch() {
            setDate(new Date())
            await searchLaunches(date)
        }
        fetch()
    }, [incomes, expenses, allLaunches])

    const [show, setShow] = useState("expenses")
    const [showFilters, setShowFilters] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [date, setDate] = useState(new Date())

    const dateStringUser = moment(date).format('MMMM[/]YYYY')

    const DatePicker = () => {
        let datePicker = <DateTimePicker display="spinner" value={date} onChange={(_, date) => {
            setDate(date)
            searchLaunches(date)
            setShowDatePicker(false)
        }} mode='date' />

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={styles.datePicker}>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.date}>
                            {dateStringUser}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    const ShowReport = () => {
        if (show == "expenses") {
            return (
                <Report launches={searchExpenses} total={totalSearchExp} />
            )
        } else if (show == "incomes") {
            return (
                <Report launches={searchIncomes} total={totalSearchInc} />
            )
        } else {
            return (
                <Report launches={searchAllLaunches} total={totalSearch} />
            )
        }
    }

    const Filters = () => {
        if (showFilters) {
            return (
                <View style={styles.secondaryContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setShowFilters(false)}>
                            <Text style={styles.buttonText}>- Filters</Text>
                        </TouchableOpacity>
                    </View>
                    <WalletFilters show={show} />
                </View>
            )
        } else {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setShowFilters(true)}>
                        <Text style={styles.buttonText}>+ Filters</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    return (
        <LinearGradient colors={['#353935', '#adb312', '#f2fa16']} style={styles.container}>
            <View style={styles.filters}>
                <View style={styles.mainFilters}>
                    <TouchableOpacity onPress={() => setShow("expenses")}>
                        <Text style={[show == "expenses" ? styles.selected : styles.unselect]}>
                            Expenses
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShow("incomes")}>
                        <Text style={[show == "incomes" ? styles.selected : styles.unselect]}>
                            Incomes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShow("all")}>
                        <Text style={[show == "all" ? styles.selected : styles.unselect]}>
                            All launches
                        </Text>
                    </TouchableOpacity>
                </View>
                <DatePicker />
            </View>
            <Filters />
            <View style={{ flex: 1, padding: 10 }}>
                <ShowReport />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filters: {
        borderRadius: 3,
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#F5FEFD',
        borderBottomWidth: 2,
    },
    mainFilters: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        padding: 5,
        marginBottom: 5,
        borderBottomColor: '#F5FEFD',
        borderBottomWidth: 1,
    },
    selected: {
        color: '#F5FEFD',
        fontWeight: 'bold',
        fontSize: 16
    },
    unselect: {
        fontSize: 15,
        color: '#CCC'
    },
    datePicker: {
        paddingHorizontal: 5,
        marginHorizontal: 5
    },
    date: {
        fontSize: 15,
        color: '#F5FEFD',
        fontWeight: 'bold'
    },
    secondaryContainer: {
        borderBottomStartRadius: 3,
        borderBottomEndRadius: 3,
    },
    buttonContainer: {
        width: '27%',
        paddingHorizontal: 15,
        paddingVertical: 2,
    },
    buttonText: {
        color: '#F5FEFD',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

