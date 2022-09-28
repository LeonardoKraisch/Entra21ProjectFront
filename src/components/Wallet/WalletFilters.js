import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Picker } from "@react-native-picker/picker";

export default props => {
    const [category, setCategory] = useState("all")
    const [description, setDescription] = useState('')

    const [pickerValue, setPickerValue] = useState("higher")
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)

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
            <Picker dropdownIconColor='#FFF' selectedValue={pickerValue} onValueChange={setPickerValue} style={styles.picker}>
                <Picker.Item style={styles.pickerItem} label="higher than:" value="higher" />
                <Picker.Item style={styles.pickerItem} label="lower than:" value="lower" />
                <Picker.Item style={styles.pickerItem} label="between:" value="between" />
            </Picker>
        )
    }

    const ValueInput = () => {
        if (pickerValue == 'higher' || pickerValue == 'lower') {
            return (
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputMoney} keyboardType='number-pad' value={value1} onChangeText={setValue1} placeholder="Value" />
                </View>
            )
        } else {
            return (
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputMoney} keyboardType='number-pad' value={value2} onChangeText={setValue2} placeholder="Lower value" />
                    <Text style={styles.titles}>and</Text>
                    <TextInput style={styles.inputMoney} keyboardType='number-pad' value={value1} onChangeText={setValue1} placeholder="Higher value" />
                </View>
            )
        }
    }

    return (
        <View style={styles.secondaryFilters}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputMoney} placeholder="Search for description" value={description} onChangeText={setDescription} />
            </View>

            <View style={styles.container}>
                <Text style={styles.titles}>Select value</Text>
                <ValuePicker />
            </View>
            <ValueInput />

            <View style={styles.container}>
                <Text style={styles.titles}>Categories: </Text>
                <BalancePicker />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.send}>
                    <Text style={styles.sendText}>Filter</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    secondaryFilters: {
        backgroundColor: '#42779E',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    picker: {
        flex: 1
    },
    pickerItem: {
        backgroundColor: '#32779E',
        color: '#FFF',
        fontSize: 15,
    },
    titles: {
        fontSize: 16,
        color: '#FFF',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 15,
    },
    inputMoney: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        flex: 1,
        fontSize: 16
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
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