import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import useAnimation from '../../data/hooks/useAnimation'

export default props => {

    const { pressedPlus, pressedMinus, pressPlus, pressMinus } = useAnimation()
    return (
        <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => pressPlus()}
                style={!pressedPlus ? styles.buttonPlus : styles.pressedPlus}>
                <FontAwesome5 name="plus" size={30} style={!pressedPlus ? styles.iconUp : styles.iconPressed} />
            </TouchableOpacity>
            <View style={{ backgroundColor: '#353935', width: 5 }}></View>
            <TouchableOpacity onPress={() => pressMinus()}
                style={!pressedMinus ? styles.buttonMinus : styles.pressedMinus}>
                <FontAwesome5 name="minus" size={30} style={!pressedMinus ? styles.iconDown : styles.iconPressed} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    containerButton: {
        flexDirection: 'row',
        width: 180,
        backgroundColor: '#353935',
        justifyContent: "space-between",
        borderTopStartRadius: 40
    },
    buttonPlus: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 12,
        flex: 1,
        borderWidth: 3,
        borderColor: '#157de6',
        flexDirection: 'row'
    },
    pressedPlus: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 12,
        flex: 1,
        borderWidth: 6,
        borderColor: '#157de6',
        flexDirection: 'row'
    },
    buttonMinus: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 3,
        borderColor: '#a410e6',
        flexDirection: 'row'
    },
    pressedMinus: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 6,
        borderColor: '#a410e6',
        flexDirection: 'row'
    },
    iconUp: {
        color: '#157de6',
        paddingVertical: 2,
    },
    iconDown: {
        color: '#a410e6',
        paddingVertical: 2,
    },
    iconPressed: {
        color: '#f2fa16',
        paddingVertical: 2,
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