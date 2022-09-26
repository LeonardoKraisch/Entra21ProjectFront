import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import MenuButton from "./MenuButton";

import useMoney from '../data/hooks/useMoney'

export default props => {
    const { balance, coin } = useMoney()
    const [showBalance, setShowBalance] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <MenuButton {...props} />
                <View style={styles.balance}>
                    <View style={styles.textIcon}>
                        <Text style={{ color: '#FFF', fontSize: 18 }}>Balance:</Text>
                        <TouchableOpacity style={styles.eye} onPress={() => setShowBalance(!showBalance)}>
                            <Ionicons name={showBalance ? 'eye' : 'eye-off-outline'}
                                size={25} color='#FFF' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.value}>
                        <Text style={{ color: '#FFF', fontSize: 27 }}>{coin}</Text>
                        <View>{showBalance ?
                            <Text style={{ color: '#FFF', fontSize: 27 }}>{balance}</Text> :
                            <Text style={{ color: '#FFF', fontSize: 27 }}>{"--------------"}</Text>}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#32779E',
        width: '100%',
        height: '20%',
        justifyContent: 'flex-end',
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    balance: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
        width: '75%',
        justifyContent: 'flex-end',
        paddingHorizontal: 7
    },
    textIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    value: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    eye: {
        width: 25,
        height: 25,
    }


})