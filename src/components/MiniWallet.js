import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default props => {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => props.navigation.navigate("CustomWallet", { wallet: props.wallet.item })}>
            <Text>{props.wallet.item.wallet.walletName}</Text>
            <Text>{props.wallet.item.wallet.walletDesc}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flex: 1,
        backgroundColor: '#353935',
        borderRadius: 3,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    walletButton: {
        flex: 1
    }
})