import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import useMoney from "../data/hooks/useMoney";
import WalletFilters from "../components/Wallet/WalletFilters";
import Report from "../components/Wallet/Report";


export default props => {
    const { balance, searchIncomes, searchExpenses, totalSearchInc, totalSearchExp, searchLaunches } = useMoney()

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
                <Report launches={balance} />
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
        <View style={styles.containter}>
            <Text style={styles.title}>Wallet</Text>
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
            <View style={{ maxHeight: "50%" }}>
                <Filters />
                <ShowReport />
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={styles.textReturn}>Return</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#3C3C3C',
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
        margin: 2,
        marginTop: 80
    },
    filters: {
        backgroundColor: '#32779E',
        borderRadius: 3,
        marginTop: 5,
        paddingBottom: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
    },
    mainFilters: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        padding: 10,
        marginBottom: 5,
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
    },
    selected: {
        color: '#FFF',
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
        color: '#FFF',
        fontWeight: 'bold'
    },
    secondaryContainer: {
        backgroundColor: '#32779E',
        borderBottomStartRadius: 3,
        borderBottomEndRadius: 3,
    },
    buttonContainer: {
        width: '23%',
        paddingHorizontal: 2,
        marginHorizontal: 2,
        backgroundColor: '#32779E',
        borderColor: '#CCC',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 50
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    row: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        alignSelf: 'center'
    },
    textReturn: {
        color: '#22EEFB'
    }
})

