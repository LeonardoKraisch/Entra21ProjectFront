import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonPlus}>
                <Text>
                    Plus
                </Text>
            </TouchableOpacity>
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
        width: '70%',
        justifyContent: 'space-between',
        backgroundColor: '#a0a0a0',
        padding: 15,
        borderRadius: 50
    },
    buttonPlus: {
        backgroundColor: '#293',
        paddingVertical: 40,
        paddingHorizontal: 35,
        borderRadius: 50
    },
    buttonMinus: {
        backgroundColor: '#933',
        paddingVertical: 40,
        paddingHorizontal: 31,
        borderRadius: 50
    }
})