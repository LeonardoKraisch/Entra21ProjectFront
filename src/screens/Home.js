import React, { useEffect } from "react";
import { SafeAreaView, View, StyleSheet, FlatList, StatusBar } from 'react-native'
import Header from "../components/Header";
import CustomWallet from "../components/CustomWallet";
import MainWallet from "../components/Wallet/MainWallet";
import AddView from "../components/AddLaunch/AddView";

import useMoney from "../data/hooks/useMoney";

export default props => {
    const { fetchAllLaunches } = useMoney()
    const wallets = [1, 2]

    useEffect(() => {
        async function fetch() {
            fetchAllLaunches()
        }
        fetch()
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
                    renderItem={(item) => (<CustomWallet />)}
                />
                <AddView />
            </View>
            <StatusBar backgroundColor={'#3C3C3C'} />
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
        backgroundColor: '#3C3C3C',
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
        borderBottomWidth: 3,
        borderBottomColor: '#333'
    }
})