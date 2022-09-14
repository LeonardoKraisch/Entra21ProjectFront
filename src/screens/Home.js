import React from "react";
import { View, StyleSheet, FlatList } from 'react-native'
import Header from "../components/Header";
import CustomWallet from "../components/CustomWallet";
import MainWallet from "../components/MainWallet";
import AddButtons from "../components/AddButtons";

export default props => {
    const wallets = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <View style={styles.containter}>
            <Header navigation={props.navigation} />
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
        </View>
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
    },
    buttonsContainer: {
        height: '25%',
        backgroundColor: '#FFF',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})