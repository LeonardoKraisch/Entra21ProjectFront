import { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Platform } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import useAnimation from '../../data/hooks/useAnimation'
import useMoney from '../../data/hooks/useMoney'

export default props => {

    const { pressedPlus } = useAnimation()
    const { send } = useMoney()

    const [money, setMoney] = useState(0)
    const [category, setCategory] = useState("other")
    const [payments, setPayments] = useState('1')
    const [totalValue, setTotalValue] = useState(true)
    const [times, setTimes] = useState(1)
    const [pending, setPending] = useState(false)
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)

    const dateString = moment(date).format('YYYY[-]M[-]D')

    const Message = () => {
        if (pressedPlus) {
            return (
                <View style={styles.title}>
                    <Text style={styles.textTitle}>
                        Add Profit to my Balance
                    </Text>
                    <AntDesign name="caretup" size={30} color="#FFF" />
                </View>
            )
        } else {
            return (
                <View style={styles.title}>
                    <Text style={styles.textTitle}>
                        Add Expenses to my Balance
                    </Text>
                    <AntDesign name="caretdown" size={30} color="#FFF" />
                </View>
            )
        }
    }
    const DatePicker = () => {
        let datePicker = <DateTimePicker value={date} onChange={(_, date) => {
            setDate(date)
            setShowDatePicker(false)
        }} mode='date' />

        const dateStringUser = moment(date).format('ddd, MMMM[/]D[/]YYYY')

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

    const ValueInput = () => {
        if (payments == '2') {
            return (
                <View style={styles.inputContainer}>
                    <Text style={styles.textTitle2}>Quantity:</Text>
                    <TextInput style={styles.input2} keyboardType='number-pad' value={times} onChangeText={setTimes} />
                </View>
            )
        }
    }

    const ButtonInput = () => {
        if (payments == '2') {
            return (
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.buttonInput} onPress={() => setTotalValue(true)}>
                        <Text style={[totalValue ? styles.selected : styles.unselect]}>Total</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonInput} onPress={() => setTotalValue(false)}>
                        <Text style={[!totalValue ? styles.selected : styles.unselect]}>Parcel</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const BalancePicker = () => {
        if (pressedPlus) {
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
        }
    }


    return (
        <View style={styles.addInfo}>
            <View style={styles.infos}>
                <Message />
                <View style={styles.inputsLine}>
                    <ValueInput />
                    <TextInputMask autoFocus={true} style={styles.inputMoney}
                        type={'money'}
                        onChangeText={setMoney}
                        value={money}
                        keyboardType="numeric" />
                </View>
                <ButtonInput />
                <View style={styles.pickerContainer}>
                    <Text style={styles.textTitle2}>Payments:</Text>
                    <Picker dropdownIconColor='#FFF' selectedValue={payments} onValueChange={setPayments} style={styles.picker}>
                        <Picker.Item style={styles.pickerItem} label="Cash 1x" value="1" />
                        <Picker.Item style={styles.pickerItem} label="Installments" value="2" />
                        <Picker.Item style={styles.pickerItem} label="Monthly" value="3" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.textTitle2}>Category:</Text>
                    <BalancePicker />
                </View>
                <TextInput style={styles.input} placeholder="Do you want to add a description?" value={description} onChangeText={setDescription} />
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.buttonInput} onPress={() => setPending(false)}>
                        <Text style={[!pending ? styles.selected : styles.unselect]}>Paid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonInput} onPress={() => setPending(true)}>
                        <Text style={[pending ? styles.selected : styles.unselect]}>Pending</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker />
                <TouchableOpacity onPress={() => send({ money, category, payments, totalValue, times, pending, dateString, description })}
                    style={styles.send}>
                    <Text style={styles.sendText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addInfo: {
        alignSelf: 'center',
        justifyContent: "space-between",
        alignItems: 'center',
        height: '80%',
        width: '100%',
        margin: 10
    },
    infos: {
        alignItems: 'center',
        width: '90%',
        margin: 15
    },
    inputsLine: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input2: {
        width: '50%',
        backgroundColor: '#444',
        textAlign: "right",
        color: '#FFF',
        fontSize: 20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '92%',
        backgroundColor: '#32779E',
        borderRadius: 3,
        marginTop: 5
    },
    buttonInput: {
        width: '50%',
        alignItems: 'center',
    },
    selected: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    unselect: {
        color: '#CCC'
    },
    inputMoney: {
        textAlign: "right",
        width: '50%',
        color: '#FFF',
        fontSize: 20,
        height: 25
    },
    title: {
        flexDirection: 'row',
        width: '95%',
        padding: 10,
        justifyContent: 'space-between'
    },
    textTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textTitle2: {
        color: '#FFF',
        fontSize: 15
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 5,
        margin: 10,
        height: 35,
    },
    pickerContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%'
    },
    picker: {
        color: '#FFF',
        width: '60%'
    },
    pickerItem: {
        backgroundColor: '#333',
        color: '#FFF',
        fontSize: 15,
    },
    datePicker: {
        borderWidth: 3,
        borderColor: '#32779E',
        borderRadius: 5,
        backgroundColor: '#333',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 10
    },
    date: {
        fontSize: 17,
        color: '#FFF',
        fontWeight: 'bold'
    },
    send: {
        backgroundColor: '#32779E',
        width: '100%',
        alignSelf: 'center',
        marginTop: 38,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: "bold"
    }
})