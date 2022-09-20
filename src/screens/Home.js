import React from "react";
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native'
import Header from "../components/Header";
import CustomWallet from "../components/CustomWallet";
import MainWallet from "../components/MainWallet";
import AddButtons from "../components/AddButtons";

export default props => {
    const wallets = [1, 2]

    return (
        <SafeAreaView style={styles.containter}>
            <Header {...props} />
            <View style={styles.body}>
                <View style={styles.mainContainer}>
                    <MainWallet />
                </View>
                <FlatList
                    numColumns={2}
                    width='97%'
                    data={wallets}
                    renderItem={(item) => (<CustomWallet />)}
                />
                <AddButtons />
            </View>
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