import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import Message from "./Message";
import ValueInput from "./ValueInput";

import useAnimation from '../../data/hooks/useAnimation'
import useMoney from '../../data/hooks/useMoney'

export default props => {

    const { pressedPlus } = useAnimation()
    const { send, coin } = useMoney()

    const [money, setMoney] = useState("0")
    const [category, setCategory] = useState("other")
    const [payments, setPayments] = useState('1')
    const [totalValue, setTotalValue] = useState(true)
    const [times, setTimes] = useState(1)
    const [pending, setPending] = useState(false)
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [wallet, setWallet] = useState(0)

    const dateString = moment(date).format('YYYY[-]MM[-]D')

    const miniWalletUpdate = (wallet) => {
        console.log(wallet)
        if (wallet > 0)
            if (pressedPlus) {
                console.log(props.wallets[wallet-1].wallet.walletTotalIncomes = parseFloat(props.wallets[wallet -1].wallet.walletTotalIncomes) + parseFloat(money.replace(coin, "")))
            } else {
                console.log(false)
                console.log(props.wallets[wallet-1].wallet.walletTotalExpenses = parseFloat(props.wallets[wallet -1].wallet.walletTotalExpenses) + parseFloat(money.replace(coin, "")))
            } else {
            console.log("no refresh")
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
                <Message {...props} getWallet={(value) => setWallet(value)} />
                <View style={styles.inputsLine}>
                    <ValueInput payments={payments} money={(value) => setMoney(value)} times={(value) => setTimes(value)} />
                </View>
                <ButtonInput />
                <View style={styles.pickerContainer}>
                    <Text style={styles.textTitle}>Payments:</Text>
                    <Picker dropdownIconColor='#FFF' selectedValue={payments} onValueChange={setPayments} style={styles.picker}>
                        <Picker.Item style={styles.pickerItem} label="Cash 1x" value="1" />
                        <Picker.Item style={styles.pickerItem} label="Installments" value="2" />
                        <Picker.Item style={styles.pickerItem} label="Monthly" value="3" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.textTitle}>Category:</Text>
                    <BalancePicker />
                </View>
                <TextInput style={styles.input} placeholder="Add description" value={description} onChangeText={setDescription} />
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.buttonInput} onPress={() => setPending(false)}>
                        <Text style={[!pending ? styles.selected : styles.unselect]}>Paid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonInput} onPress={() => setPending(true)}>
                        <Text style={[pending ? styles.selected : styles.unselect]}>Pending</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker />
                <TouchableOpacity
                    disabled={money == 0 || '' ? true : false}
                    onPress={async () => {
                        await send({
                            wallet,
                            money,
                            category,
                            payments,
                            totalValue,
                            times,
                            pending,
                            dateString,
                            description
                        }), miniWalletUpdate(wallet)
                    }}
                    style={styles.send}>
                    <Text style={styles.sendText}>Send</Text>
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
        minHeight: '85%',
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

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '92%',
        backgroundColor: '#3155d6',
        borderRadius: 3,
        marginTop: 10
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
    textTitle: {
        color: '#FFF',
        fontSize: 15
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        height: '10%',
        borderRadius: 5,
        margin: 10,
        marginTop: 15
    },
    pickerContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    picker: {
        color: '#FFF',
        width: '60%',

    },
    pickerItem: {
        backgroundColor: '#353935',
        color: '#FFF',
        fontSize: 15,
    },
    datePicker: {
        borderWidth: 3,
        borderColor: '#3155d6',
        borderRadius: 5,
        backgroundColor: '#353935',
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
        backgroundColor: '#3155d6',
        width: '100%',
        alignSelf: 'center',
        marginTop: 25,
        height: 50,
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