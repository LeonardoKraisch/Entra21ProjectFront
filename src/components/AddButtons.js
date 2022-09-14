import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonPlus}>
                <Text>
                    Plus
                </Text>
            </TouchableOpacity>
            <View style={{backgroundColor: '#333', width: 4}}></View>
            <TouchableOpacity style={styles.buttonMinus}>
                <Text>
                    Minus
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 180,
        backgroundColor: '#333',
        justifyContent: "flex-end",
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingTop: 4,
        paddingLeft: 8,
        borderTopStartRadius: 57,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#32779E'
    },
    buttonPlus: {
        backgroundColor: '#34F9b2',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderTopStartRadius: 50,
        borderWidth: 3,
        borderColor: '#32c622'
    },
    buttonMinus: {
        backgroundColor: '#f64232',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 3,
        borderColor: '#c63222'
    }
})