import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import useAnimation from '../../data/hooks/useAnimation'

export default props => {

    const { pressedPlus, pressedMinus, pressPlus, pressMinus } = useAnimation()
    return (
        <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => pressPlus()}
                style={!pressedPlus ? styles.buttonPlus : styles.pressedPlus}>
                <Entypo name="circle-with-plus" size={30} style={!pressedPlus ? styles.iconUp : styles.iconPressed} />
                <Text style={[!pressedPlus ? styles.iconUp : styles.iconPressed,{ fontSize: 25 }]}>$</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: '#333', width: 4 }}></View>
            <TouchableOpacity onPress={() => pressMinus()}
                style={!pressedMinus ? styles.buttonMinus : styles.pressedMinus}>
                <Entypo name="circle-with-minus" size={30} style={!pressedMinus ? styles.iconDown : styles.iconPressed} />
                <Text style={[!pressedMinus ? styles.iconDown : styles.iconPressed,{ fontSize: 25 }]}>$</Text>
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
        backgroundColor: '#71E9a1',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 28,
        flex: 1,
        borderWidth: 3,
        borderColor: '#32c622',
        flexDirection: 'row'
    },
    pressedPlus: {
        backgroundColor: '#32c62280',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 28,
        flex: 1,
        borderWidth: 3,
        borderColor: '#32c62265',
        flexDirection: 'row'
    },
    buttonMinus: {
        backgroundColor: '#f25545',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 3,
        borderColor: '#c63222',
        flexDirection: 'row'
    },
    pressedMinus: {
        backgroundColor: '#c6322280',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 3,
        borderColor: '#c6322240',
        flexDirection: 'row'
    },
    iconUp: {
        color: '#32c622',
    },
    iconDown: {
        color: '#c63222'
    },
    iconPressed: {
        color: '#FFF'
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