import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import useAnimation from '../data/hooks/useAnimation'

export default props => {

    const { pressedPlus, pressedMinus, pressPlus, pressMinus } = useAnimation()
    return (
        <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => pressPlus()}
                style={!pressedPlus ? styles.buttonPlus : styles.pressedPlus}>
                <Entypo name="circle-with-plus" size={30} color='#32c622' />
                <Text style={{ color: '#32c622', fontSize: 25 }}>$</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: '#333', width: 4 }}></View>
            <TouchableOpacity onPress={() => pressMinus()}
                style={!pressedMinus ? styles.buttonMinus : styles.pressedMinus}>
                <Entypo name="circle-with-minus" size={30} color='#c63222' />
                <Text style={{ color: '#c63222', fontSize: 25 }}>$</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        maxHeight: '100%',
        backgroundColor: '#333',
        justifyContent: "space-between",
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingTop: 5,
        paddingLeft: 5,
        borderTopStartRadius: 36,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        paddingBottom: 1,
        borderColor: '#32779E',

    },
    containerButton: {
        flexDirection: 'row',
        width: 180,
        backgroundColor: '#333',
        justifyContent: "space-between",
        borderTopStartRadius: 40
    },
    buttonPlus: {
        backgroundColor: '#34F9b2',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 28,
        flex: 1,
        borderWidth: 3,
        borderColor: '#32c622',
        flexDirection: 'row'
    },
    pressedPlus: {
        backgroundColor: '#34F9b2',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 28,
        flex: 1,
        borderWidth: 3,
        borderColor: '#34F9b2',
        flexDirection: 'row'
    },
    buttonMinus: {
        backgroundColor: '#f64232',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 3,
        borderColor: '#c63222',
        flexDirection: 'row'
    },
    pressedMinus: {
        backgroundColor: '#f64232',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 3,
        borderColor: '#f64232',
        flexDirection: 'row'
    },
    buttonClose: {
        backgroundColor: '#f64232',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#c63222',
        flexDirection: 'row'
    }

})