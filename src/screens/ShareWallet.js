import { StyleSheet, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

export default props => {
    console.log(props.route.params.wallet.item.wuCode)
    return (
        <View style={styles.containter} >
            <QRCode style={styles.qrcode}
                value={`Olá, está e a wallet de codigo: ${props.route.params.wallet.item.wuCode}`}
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