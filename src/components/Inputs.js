import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";


export default props => {

    const [money, setMoney] = useState(0)

    return (
        <View style={styles.addInfo}>
            <View style={styles.infos}>
                <TextInputMask autoFocus={true} style={styles.input}
                    type={'money'}
                    placeholder="Add entry"
                    onChangeText={setMoney}
                    value={money}
                    keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Do you want to input a description?" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addInfo: {
        alignSelf: 'center',
        justifyContent: "space-between",
        height: '80%',
        width: '95%'
    },
    infos: {

    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 5
    }
})