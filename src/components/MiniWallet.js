import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default props => {

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>{props.wallet.walletName}</Text>
                <Text>{props.wallet.walletDesc}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flex: 1,
        backgroundColor: '#32779E',
        borderRadius: 3,
        margin: 10
    }
})