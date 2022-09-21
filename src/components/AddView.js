import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import RollInView from "./RollInView";
import AddButtons from "./AddButtons"
import Inputs from "./Inputs";
import useAnimation from "../data/hooks/useAnimation";

export default props => {
    const { show, close } = useAnimation()

    return (
        <RollInView style={styles.container}>
            <AddButtons />
            {show ?
                <View style={{ flexDirection: 'column-reverse', justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => close()} style={styles.buttonClose}>
                        <Entypo name="circle-with-cross" size={30} color='#c63222' />
                    </TouchableOpacity>
                    <Inputs />
                </View>
                :
                false
            }
        </RollInView >
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