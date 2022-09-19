import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonPlus}>
                <Entypo name="circle-with-plus" size={30} color='#32c622'/>
                <Text style={{color: '#32c622', fontSize: 25}}>$</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: '#333', width: 4 }}></View>
            <TouchableOpacity style={styles.buttonMinus}>
                <Entypo name="circle-with-minus" size={30} color='#c63222'/>
                <Text style={{color: '#c63222', fontSize: 25}}>$</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 180,
        backgroundColor: '#333',
        justifyContent: "space-between",
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingTop: 4,
        paddingLeft: 8,
        borderTopStartRadius: 40,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#32779E'
    },
    buttonPlus: {
        backgroundColor: '#34F9b2',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 30,
        flex: 1,
        borderWidth: 3,
        borderColor: '#32c622',
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
    }
})