import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList, StatusBar, TouchableOpacity, Text } from 'react-native'
import Header from "../components/Header";
import MiniWallet from "../components/MiniWallet";
import MainWallet from "../components/Wallet/MainWallet";
import AddView from "../components/AddLaunch/AddView";
import useMoney from "../data/hooks/useMoney";

export default props => {
    const { getWallets } = useMoney()
    const [wallets, setWallets] = useState()
    useEffect(() => {
        async function loadWallets() {
            setWallets(await getWallets())
        }
        loadWallets()
    }, [])

    return (
        <SafeAreaView style={styles.containter}>
            <Header {...props} />
            <View style={styles.body}>
                <View style={styles.mainContainer}>
                    <MainWallet {...props} />
                </View>
                <FlatList
                    numColumns={2}
                    width='97%'
                    data={wallets}
                    renderItem={(wallet) =>
                        <MiniWallet 
                        wallet={wallet} 
                        navigation={props.navigation}
                        />
                    }
                />
                <AddView />
            </View>
            <StatusBar backgroundColor={'#32779E'} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containter: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: '#555',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    mainContainer: {
        margin: 10,
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})