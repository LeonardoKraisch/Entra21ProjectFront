import { Text, StyleSheet, TouchableOpacity, View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default props => {
    const [favorite, setFavorite] = useState(false)

    return (
        <TouchableOpacity style={styles.container}
            onPress={() => props.navigation.navigate("CustomWallet", { wallet: props.wallet.item, wallets: props.wallets })}>
            <View style={styles.label}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="wallet-outline" size={22} color="#F5FEFD" />
                    <Text style={styles.labelText}>
                        {props.wallet.item.wallet.walletName}
                    </Text>
                </View>
                <Pressable
                    style={styles.buttonStyle}
                    onPress={() => setFavorite(!favorite)}>
                    <FontAwesome
                        name={favorite ? "star" : "star-o"}
                        size={20}
                        color="#F5FEFD"
                    />
                </Pressable>
            </View>
            <View style={styles.values}>
                <View style={styles.arrows}>
                    <View style={styles.incCont}>
                        <FontAwesome name="arrow-up" color="#157de6" size={17} />
                        <Text style={styles.valuesText}>{props.wallet.item.wallet.walletTotalIncomes}</Text>
                    </View>
                    <View style={styles.expCont}>
                        <FontAwesome name="arrow-down" color="#a410e6" size={17} />
                        <Text style={styles.valuesText}>{props.wallet.item.wallet.walletTotalExpenses}</Text>
                    </View>
                    <View style={styles.totalCont}>
                        <Text style={styles.totalText}>
                            Total
                        </Text>
                        <Text style={styles.totalText}>{props.wallet.item.wallet.walletTotalIncomes - props.wallet.item.wallet.walletTotalExpenses}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 105,
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
        elevation: 5
    },
    label: {
        borderBottomColor: '#F5FEFD',
        borderBottomWidth: 1,
        padding: 3,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 4
    },
    labelText: {
        color: '#F5FEFD',
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 3
    },
    values: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    valuesText: {
        fontSize: 14,
        paddingLeft: 5,
        color: '#F5FEFD'
    },
    arrows: {
        flex: 1,
    },
    incCont: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    expCont: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    totalCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2
    },
    totalText: {
        color: '#F5FEFD',
        fontSize: 15,
        fontWeight: 'bold',
        paddingRight: 4
    },
    buttonStyle: {

    },
    activeButtonStyle: {

    },
    inactiveButtonStyle: {

    }
})