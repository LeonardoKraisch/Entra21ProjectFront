import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from "@react-native-picker/picker";

import useMoney from "../data/hooks/useMoney";

export default props => {
    const [show, setShow] = useState("expenses")
    const [date2, setDate2] = useState(new Date())
    const [showDatePicker2, setShowDatePicker2] = useState(false)
    const [date1, setDate1] = useState(new Date().setMonth(date2.getMonth() - 1))
    const [showDatePicker1, setShowDatePicker1] = useState(false)
    const [category, setCategory] = useState("other")

    const dateString1 = moment(date1).format('YYYY[-]M[-]D')
    const dateString2 = moment(date2).format('YYYY[-]M[-]D')

    const { balance } = useMoney()

    const showExpenses = () => {
        return (
            <View style={styles.info}>
                <View>
                    <Text>Total expenses:</Text>
                </View>
                <View>
                    <Text>{balance}</Text>
                </View>
            </View>
        )
    }
    const showTotal = () => {
        return (
            <View style={styles.info}>
                <View>
                    <Text>Total balance:</Text>
                </View>
                <View>
                    <Text>{balance}</Text>
                </View>
            </View>
        )
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

    const BalancePicker = () => {
        if (show == "expenses") {
            return (
                <Picker dropdownIconColor='#FFF' selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item style={styles.pickerItem} label="Food 🍽" value="food" />
                    <Picker.Item style={styles.pickerItem} label="Car 🚗" value="car" />
                    <Picker.Item style={styles.pickerItem} label="House 🏠" value="house" />
                    <Picker.Item style={styles.pickerItem} label="Fun 🎡" value="fun" />
                    <Picker.Item style={styles.pickerItem} label="Education 📚" value="education" />
                    <Picker.Item style={styles.pickerItem} label="Health 🩺" value="health" />
                    <Picker.Item style={styles.pickerItem} label="Clothes 👕" value="clothes" />
                    <Picker.Item style={styles.pickerItem} label="Services 🛠" value="services" />
                    <Picker.Item style={styles.pickerItem} label="Transportation 🚌" value="transportation" />
                    <Picker.Item style={styles.pickerItem} label="Other 💲" value="other" />
                </Picker>
            )
        } else if (show == "incomes") {
            return (
                <Picker dropdownIconColor='#FFF' selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item style={styles.pickerItem} label="Fixed 💼" value="fixed" />
                    <Picker.Item style={styles.pickerItem} label="Benefits 💳" value="benefits" />
                    <Picker.Item style={styles.pickerItem} label="Comission 👔" value="comission" />
                    <Picker.Item style={styles.pickerItem} label="Services 🛠" value="services" />
                    <Picker.Item style={styles.pickerItem} label="Sales 🤝" value="sales" />
                    <Picker.Item style={styles.pickerItem} label="Other 💲" value="other" />
                </Picker>
            )
        } else {
            <Picker dropdownIconColor='#FFF' selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                <Picker.Item style={styles.pickerItem} label="Food 🍽" value="food" />
                <Picker.Item style={styles.pickerItem} label="Car 🚗" value="car" />
                <Picker.Item style={styles.pickerItem} label="House 🏠" value="house" />
                <Picker.Item style={styles.pickerItem} label="Fun 🎡" value="fun" />
                <Picker.Item style={styles.pickerItem} label="Education 📚" value="education" />
                <Picker.Item style={styles.pickerItem} label="Health 🩺" value="health" />
                <Picker.Item style={styles.pickerItem} label="Clothes 👕" value="clothes" />
                <Picker.Item style={styles.pickerItem} label="Transportation 🚌" value="transportation" />
                <Picker.Item style={styles.pickerItem} label="Fixed 💼" value="fixed" />
                <Picker.Item style={styles.pickerItem} label="Benefits 💳" value="benefits" />
                <Picker.Item style={styles.pickerItem} label="Comission 👔" value="comission" />
                <Picker.Item style={styles.pickerItem} label="Services 🛠" value="services" />
                <Picker.Item style={styles.pickerItem} label="Sales 🤝" value="sales" />
                <Picker.Item style={styles.pickerItem} label="Other 💲" value="other" />
            </Picker>
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
                <View style={styles.secondaryFilters}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.dateTitle}>Categories: </Text>
                        <BalancePicker />
                    </View>
                </View>
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
    row: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        alignSelf: 'center'
    },
    textReturn: {
        color: '#22EEFB'
    },
    info: {
        height: '80%',
        width: '100%',
        flexDirection: "row"
    },
    filters: {
        backgroundColor: '#32779E',
        borderRadius: 3,
        marginTop: 5
    },
    mainFilters: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        justifyContent: "space-around",
        flexDirection: 'row',
        alignItems: 'center'
    },
    datePicker: {
        borderRadius: 5,
        backgroundColor: '#333',
        paddingVertical: 2,
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
    picker: {
        color: '#FFF',
        width: '40%'
    },
    pickerItem: {
        backgroundColor: '#333',
        color: '#FFF',
        fontSize: 15,
    },
})