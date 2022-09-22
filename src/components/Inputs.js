import { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import useAnimation from '../data/hooks/useAnimation'

export default props => {

    const { pressedPlus } = useAnimation()
    const [money, setMoney] = useState(0)
    const [category, setCategory] = useState("other")

    const Message = () => {
        if (pressedPlus) {
            return (
                <View style={styles.title}>
                    <AntDesign name="caretup" size={30} color="#FFF" />
                    <Text style={styles.textTitle}>
                        Add Money to my Balance
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.title}>
                    <AntDesign name="caretdown" size={30} color="#FFF" />
                    <Text style={styles.textTitle}>
                        Add Expenses to my Balance
                    </Text>
                </View>
            )
        }
    }

    const BalancePicker = () => {
        if (pressedPlus) {
            return (
                <Picker dropdownIconColor='#FFF' selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item style={styles.pickerItem} label="Fixed" value="fixed" />
                    <Picker.Item style={styles.pickerItem} label="Benefits" value="benefits" />
                    <Picker.Item style={styles.pickerItem} label="Comission" value="comission" />
                    <Picker.Item style={styles.pickerItem} label="Services" value="services" />
                    <Picker.Item style={styles.pickerItem} label="Sales" value="sales" />
                    <Picker.Item style={styles.pickerItem} label="Other" value="other" />
                </Picker>
            )
        } else {
            return (
                <Picker dropdownIconColor='#FFF' selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item style={styles.pickerItem} label="🍽 Food" value="food" />
                    <Picker.Item style={styles.pickerItem} label="🚗 Car" value="car" />
                    <Picker.Item style={styles.pickerItem} label="🏠 House" value="house" />
                    <Picker.Item style={styles.pickerItem} label="🎡 Fun" value="fun" />
                    <Picker.Item style={styles.pickerItem} label="📚 Education" value="education" />
                    <Picker.Item style={styles.pickerItem} label="🩺 Health" value="health" />
                    <Picker.Item style={styles.pickerItem} label="👕 Clothes" value="clothes" />
                    <Picker.Item style={styles.pickerItem} label="🛠 Services" value="services" />
                    <Picker.Item style={styles.pickerItem} label="🚌 Transportation" value="transportation" />
                    <Picker.Item style={styles.pickerItem} label="💲 Other" value="other" />
                </Picker>
            )
        }
    }
    return (
        <View style={styles.addInfo}>
            <View style={styles.infos}>
                <Message />
                <TextInputMask autoFocus={true} style={styles.input}
                    type={'money'}
                    onChangeText={setMoney}
                    value={money}
                    keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Do you want to input a description?" />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text style={styles.textTitle2}>Select a category:</Text>
                    <BalancePicker />
                </View>
                <TouchableOpacity>
                    <Text>Add</Text>
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
        width: '90%',
        margin: 15
    },
    title: {
        flexDirection: 'row',
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
        borderRadius: 5,
        margin: 10,
        height: 35
    },
    picker: {
        color: '#FFF',
        width: '50%'
    },
    pickerItem: {
        backgroundColor: '#333',
        color: '#FFF',
        fontSize: 20,
    }
})