import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

export default props => {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => props.navigation.navigate("CustomWallet", { wallet: props.wallet.item, wallets: props.wallets })}>
            <View style={styles.label}>
                <Text style={styles.labelText}>
                    {props.wallet.item.wallet.walletName}
                </Text>
            </View>
            <View style={styles.desc}>
                <Text style={styles.descText}>{props.wallet.item.wallet.walletDesc}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flex: 1,
        backgroundColor: '#353935',
        borderRadius: 5,
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
    label: {
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        padding: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4
    },
    labelText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14
    },
    desc: {
        flex: 1,
        padding: 5,
        flexWrap: 'wrap'
    },
    descText: {
        fontSize: 12,
        color: '#FFF9'
    }
})