import { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
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
                <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item label="Fixed" value="fixed" />
                    <Picker.Item label="Benefits" value="benefits" />
                    <Picker.Item label="Comission" value="comission" />
                    <Picker.Item label="Services" value="services" />
                    <Picker.Item label="Sales" value="sales" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            )
        } else {
            return (
                <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item label="Food" value="food" />
                    <Picker.Item label="Car" value="car" />
                    <Picker.Item label="House" value="house" />
                    <Picker.Item label="Fun" value="fun" />
                    <Picker.Item label="Education" value="education" />
                    <Picker.Item label="Health" value="health" />
                    <Picker.Item label="Clothes" value="clothes" />
                    <Picker.Item label="Services" value="services" />
                    <Picker.Item label="Transportation" value="transportation" />
                    <Picker.Item label="Other" value="other" />
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
                <BalancePicker />
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
    input: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 10,
        height: 35
    },

})