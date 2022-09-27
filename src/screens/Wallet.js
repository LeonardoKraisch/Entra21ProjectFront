import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import useMoney from "../data/hooks/useMoney";

export default props => {

    const {balance} = useMoney()

    return (
        <View style={styles.containter}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={styles.textReturn}>Return</Text>
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Wallet</Text>
            <View style={styles.info}>
                <View>
                    <Text>Total balance:</Text>
                </View>
                <View>
                    <Text>{balance}</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        backgroundColor: '#3C3C3C',
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
        margin: 2
    },
    row: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        alignSelf: 'center'
    },
    textReturn: {
        color: '#22EEFB'
    },
    info: {
        height: '80%',
        width: '100%'
    }
})