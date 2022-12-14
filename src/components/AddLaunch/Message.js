import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import useAnimation from '../../data/hooks/useAnimation'

export default props => {
    const { pressedPlus } = useAnimation()
    const [wallet, setWallet] = useState()
    const [wallets, setWallets] = useState(["My Wallet",])
    var customWallets = []

    useEffect(() => {
        async function fetch() {
            try {
                await props.wallets.forEach((w) => {
                    customWallets.push(w.wallet.walletName)
                })
                setWallets([...wallets, ...customWallets])
                setWallet(wallets[0])
            } catch (e) {
                console.log(e);
            }
        }

        fetch()
    }, [props.wallets])

    if (pressedPlus) {
        return (
            <View style={styles.title}>
                <Text style={styles.textTitle}>
                    Add Profit to
                </Text>
                <SelectDropdown
                    buttonTextStyle={{
                        color: '#F5FEFD',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                    rowTextStyle={{
                        color: '#F5FEFD',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                    defaultValue={wallet}
                    buttonStyle={{ backgroundColor: '#353935', borderBottomColor: '#F5FEFD', borderBottomWidth: 1, height: 28, paddingHorizontal: 5 }}
                    dropdownStyle={{ backgroundColor: '#353935' }}
                    data={wallets}
                    onSelect={(selected, i) => {
                        console.log(props.wallets[i-1].wallet);
                        setWallet(props.wallets[i-1].wallet)
                        props.getWallet(props.wallets[i-1].wallet)
                    }}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.title}>
                <Text style={styles.textTitle}>
                    Add Expenses to
                </Text>
                <SelectDropdown
                    buttonTextStyle={{
                        color: '#F5FEFD',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                    rowTextStyle={{
                        color: '#F5FEFD',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                    defaultValue={wallet}
                    buttonStyle={{ backgroundColor: '#353935', borderBottomColor: '#F5FEFD', borderBottomWidth: 1, height: 28, paddingHorizontal: 5 }}
                    dropdownStyle={{ backgroundColor: '#353935' }}
                    data={wallets}
                    onSelect={(selected, i) => {
                        setWallet(props.wallets[i-1].wallet.walletCode)
                        props.getWallet(props.wallets[i-1].wallet.walletCode)
                    }}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        width: '95%',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    textTitle: {
        color: '#F5FEFD',
        fontSize: 20,
        fontWeight: 'bold'
    },
})