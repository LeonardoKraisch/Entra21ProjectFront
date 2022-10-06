import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("CustomWallet", {wallet: props.wallet.item})}
            >
                <Text>{props.wallet.item.walletCode.walletName}</Text>
                <Text>{props.wallet.item.walletCode.walletDesc}</Text>
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
    },
    walletButton:{
        flex:1
    }
})