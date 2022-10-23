import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import MenuButton from "./MenuButton";
import { TextMask } from "react-native-masked-text";

import useMoney from '../data/hooks/useMoney'

export default props => {
    const { moneyInc, moneyExp, coin, recalBalance } = useMoney()
    const [localBalance, setLocalBalance] = useState(0)
    const [showBalance, setShowBalance] = useState(true)

    useEffect(() => {
        async function fetch() {
            setLocalBalance(await recalBalance())
        }
        fetch()
    }, [moneyInc, moneyExp])

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <MenuButton {...props} />
                <View style={styles.balance}>
                    <View style={styles.textIcon}>
                        <TouchableOpacity style={styles.eye} onPress={() => setShowBalance(!showBalance)}>
                            <Ionicons name={showBalance ? 'eye' : 'eye-off-outline'}
                                size={25} color='#F5FEFD' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.value}>
                        <Text style={{ color: '#F5FEFD', fontSize: 27 }}>{coin}</Text>
                        <View>{showBalance ?
                            <TextMask type={'money'}
                                value={localBalance}
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    unit: localBalance >= 0 ? '' : '-',
                                    delimiter: '.',
                                    suffixUnit: ''
                                }} style={{ color: '#F5FEFD', fontSize: 27 }} /> :
                            <Text style={{ color: '#F5FEFD', fontSize: 27 }}>{"--------------"}</Text>}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '20%',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    balance: {
        borderBottomColor: '#F5FEFD',
        borderBottomWidth: 1,
        paddingTop: 5,
        width: '80%',
        justifyContent: 'flex-end',
        paddingHorizontal: 7
    },
    textIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5
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