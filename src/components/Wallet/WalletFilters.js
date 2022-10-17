import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { TextInputMask } from "react-native-masked-text";

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import { Picker } from "@react-native-picker/picker";

import useMoney from '../../data/hooks/useMoney'

export default props => {

    const { filterPlus } = useMoney()

    const [date2, setDate2] = useState(new Date())
    const [showDatePicker2, setShowDatePicker2] = useState(false)
    const lastMonth = new Date()
    lastMonth.setMonth(date2.getMonth() - 1)
    const dateString2 = moment(date2).format('YYYY[-]MM[-]DD')

    const [date1, setDate1] = useState(lastMonth)
    const [showDatePicker1, setShowDatePicker1] = useState(false)
    const dateString1 = moment(date1).format('YYYY[-]MM[-]DD')

    const [category, setCategory] = useState("all")
    const [description, setDescription] = useState('')

    const [pickerValue, setPickerValue] = useState(">")
    const [value1, setValue1] = useState("0")
    const [value2, setValue2] = useState("0")


    const applyFilters = async () => {
        await filterPlus({
            type: "+",
            filter: {
                date: {
                    type: "[]",
                    initDate: dateString1,
                    endDate: dateString2
                },
                money: {
                    type: pickerValue,
                    minValue: parseFloat(value1.replace('R$', '')),
                    maxValue: parseFloat(value2.replace('R$', ''))
                },
                category: {
                    type: category,
                    value: category
                },
                description: { value: description }
            }
        }, {
            type: "-",
            filter: {
                date: {
                    type: "[]",
                    initDate: dateString1,
                    endDate: dateString2
                },
                money: {
                    type: pickerValue,
                    minValue: parseFloat(value1.replace('R$', '')),
                    maxValue: parseFloat(value2.replace('R$', ''))
                },
                category: {
                    type: category,
                    value: category
                },
                description: { value: description }
            }
        })
    }

    const DatePicker1 = () => {
        let datePicker = <DateTimePicker value={date1} onChange={(_, date) => {
            setDate1(date)
            setShowDatePicker1(false)
        }} mode='date' />

        const dateStringUser1 = moment(date1).format('D[/]M[/]YYYY')

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

        const dateStringUser2 = moment(date2).format('D[/]M[/]YYYY')

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
        if (props.show == "expenses") {
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
                    <Picker.Item style={styles.pickerItem} label="All 💲" value="all" />
                </Picker>
            )
        } else if (props.show == "incomes") {
            return (
                <Picker dropdownIconColor='#FFF' selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item style={styles.pickerItem} label="Fixed 💼" value="fixed" />
                    <Picker.Item style={styles.pickerItem} label="Benefits 💳" value="benefits" />
                    <Picker.Item style={styles.pickerItem} label="Comission 👔" value="comission" />
                    <Picker.Item style={styles.pickerItem} label="Services 🛠" value="services" />
                    <Picker.Item style={styles.pickerItem} label="Sales 🤝" value="sales" />
                    <Picker.Item style={styles.pickerItem} label="Other 💲" value="other" />
                    <Picker.Item style={styles.pickerItem} label="All 💲" value="all" />
                </Picker>
            )
        } else {
            return (
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
                    <Picker.Item style={styles.pickerItem} label="All 💲" value="all" />
                </Picker>
            )
        }
    }

    const ValuePicker = () => {
        return (
            <Picker dropdownIconColor='#FFF' itemStyle={styles.pickerItem} selectedValue={pickerValue} onValueChange={setPickerValue} style={styles.picker}>
                <Picker.Item style={styles.pickerItem} label="higher than:" value=">" />
                <Picker.Item style={styles.pickerItem} label="lower than:" value="<" />
                <Picker.Item style={styles.pickerItem} label="between:" value="[]" />
            </Picker>
        )
    }

    const ValueInput = () => {
        if (pickerValue == '<' || pickerValue == '>') {
            return (
                <View style={styles.inputContainer}>
                    <TextInputMask style={styles.inputMoney} value={value1} onChangeText={setValue1} options={{
                        precision: 2,
                        separator: ',',
                        unit: 'R$',
                        delimiter: '.',
                        suffixUnit: ''
                    }} type="money" />
                </View>
            )
        } else {
            return (
                <View style={styles.inputContainer}>
                    <TextInputMask style={styles.inputMoney} value={value1} onChangeText={setValue1}
                        options={{
                            precision: 2,
                            separator: ',',
                            unit: 'R$',
                            delimiter: '.',
                            suffixUnit: ''
                        }} type="money" />
                    <Text style={styles.titles}>and</Text>
                    <TextInputMask style={styles.inputMoney} value={value2} onChangeText={setValue2}
                        options={{
                            precision: 2,
                            separator: ',',
                            unit: 'R$',
                            delimiter: '.',
                            suffixUnit: ''
                        }} type="money" />
                </View>
            )
        }
    }

    return (
        <View style={styles.secondaryFilters}>
            <View style={styles.genericContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.dateTitle}>Date between:</Text>
                    <DatePicker1 />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.dateTitle}>to:</Text>
                    <DatePicker2 />
                </View>
            </View>
            <View style={styles.mainValuesCont}>
                <View style={styles.valuesContainer}>
                    <Text style={styles.titles}>Values</Text>
                    <ValuePicker />
                </View>
                <ValueInput />
            </View>

            <View style={styles.genericContainer}>
                <Text style={styles.titles}>Categories: </Text>
                <BalancePicker />
            </View>

            <View style={styles.genericContainer}>
                <TextInput style={styles.inputMoney} placeholder="Search for description" placeholderTextColor={'#FFF9'} value={description} onChangeText={setDescription} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.send}
                    onPress={() => applyFilters()}>
                    <Text style={styles.sendText}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    secondaryFilters: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
    },
    genericContainer: {
        width: '85%',
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        margin: 10,
    },
    mainValuesCont: {
        width: '85%',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        margin: 10,
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
    picker: {
        flex: 1,
    },
    pickerItem: {
        backgroundColor: '#243e9c',
        color: '#FFF',
        fontSize: 15,
    },
    titles: {
        fontSize: 16,
        color: '#FFF',
    },
    valuesContainer: {
        minHeight: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        paddingHorizontal: 10,
        marginBottom: 5
    },
    inputMoney: {
        paddingHorizontal: 5,
        marginHorizontal: 10,
        textAlign: 'center',
        color: '#FFF',
        flex: 1,
        fontSize: 18
    },
    buttonContainer: {
        alignItems: 'center',
        width: '90%',
        marginVertical: 15,
    },
    send: {
        backgroundColor: '#FFF',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    sendText: {
        fontWeight: 'bold',
        color: '#666',
        fontSize: 16
    }

})