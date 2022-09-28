import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import useMoney from "../data/hooks/useMoney";
import WalletFilters from "../components/Wallet/WalletFilters";
import Report from "../components/Wallet/Report";

export default props => {
    const [show, setShow] = useState("expenses")
    const [showFilters, setShowFilters] = useState(false)

    const [date2, setDate2] = useState(new Date())
    const [showDatePicker2, setShowDatePicker2] = useState(false)

    const lastMonth = new Date()
    lastMonth.setMonth(date2.getMonth() - 1)
    const [date1, setDate1] = useState(lastMonth)
    const [showDatePicker1, setShowDatePicker1] = useState(false)

    const dateString1 = moment(date1).format('YYYY[-]M[-]D')
    const dateString2 = moment(date2).format('YYYY[-]M[-]D')

    const { balance, total, expenses } = useMoney()

    const showReport = () => {
        if (show == "expenses") {
            return (
                <Report total={expenses} />
            )
        } else if (show == "incomes") {
            return (
                <Report total={total} />
            )
        } else {
            return (
                <Report total={balance} />
            )
        }
    }

    const DatePicker1 = () => {
        let datePicker = <DateTimePicker value={date1} onChange={(_, date) => {
            setDate1(date)
            setShowDatePicker1(false)
        }} mode='date' />

        const dateStringUser1 = moment(date1).format('M[/]D[/]YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={styles.datePicker}>
                    <TouchableOpacity onPress={() => setShowDatePicker1(true)}>
                        <Text style={styles.date}>
                            {dateStringUser1}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker1 && datePicker}
                </View>
            )
        }
        return datePicker
    }

    const DatePicker2 = () => {
        let datePicker = <DateTimePicker value={date2} onChange={(_, date) => {
            setDate2(date)
            setShowDatePicker2(false)
        }} mode='date' />

        const dateStringUser2 = moment(date2).format('M[/]D[/]YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={styles.datePicker}>
                    <TouchableOpacity onPress={() => setShowDatePicker2(true)}>
                        <Text style={styles.date}>
                            {dateStringUser2}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker2 && datePicker}
                </View>
            )
        }
        return datePicker
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
                <View style={styles.setDate}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.dateTitle}>From:</Text>
                        <DatePicker1 />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.dateTitle}>to:</Text>
                        <DatePicker2 />
                    </View>
                </View>
            </View>
            <Filters />
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
        margin: 2
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
    setDate: {
        width: '85%',
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: 'row',
        margin: 5
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
    dateTitle: {
        fontSize: 16,
        color: '#FFF',
    },
    secondaryContainer: {
        backgroundColor: '#32779E'
    },
    buttonContainer: {
        width: '20%',
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
        fontSize: 13,
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

