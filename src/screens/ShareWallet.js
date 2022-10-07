import { StyleSheet, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import {createURL} from 'expo-linking'
import { useEffect, useState } from 'react'



export default props => {
    console.log(`${createURL("/")}inviteWallet/${props.route.params.wallet.item.wuCode}`)
    return (
        <View style={styles.containter} >
            <QRCode style={styles.qrcode}
                value={`${createURL("/")}inviteWallet/${props.route.params.wallet.item.wuCode}`}
                size={390}
            /></View>

    )
}


const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: '#555',
        minWidth: 500,
    },
    qrcode: {
        flex: 1,
        backgroundColor: '#555',
        minWidth: 500,
    }
})