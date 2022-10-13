import { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default props => {
    const [money, setMoney] = useState("0")
    const [times, setTimes] = useState(1)

    if (props.payments == '2') {
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>Quantity:</Text>
                <TextInput style={styles.inputTimes} keyboardType='number-pad' value={times} onChangeText={(value) => {
                    setTimes(value)
                    props.times(value)
                }} />
                <TextInputMask autoFocus={true} style={styles.inputMoney}
                    type={'money'}
                    onChangeText={(value) => {
                        setMoney(value)
                        props.money(value)
                    }}
                    value={money}
                    keyboardType="numeric" />
            </View>
        )
    } else {
        return (
            <TextInputMask autoFocus={true} style={styles.inputMoney}
                type={'money'}
                onChangeText={(value) => {
                    setMoney(value)
                    props.money(value)
                }}
                value={money}
                keyboardType="numeric" />
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTitle: {
        color: '#FFF',
        fontSize: 15
    },
    inputTimes: {
        width: '48%',
        marginRight: 10,
        height: 20,
        backgroundColor: '#FFF',
        textAlign: "right",
        color: '#000',
        borderRadius: 5,
        fontSize: 18
    },
    inputMoney: {
        textAlign: "right",
        width: '50%',
        color: '#FFF',
        fontSize: 20,
        height: 25,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        marginBottom: 5
    },
})