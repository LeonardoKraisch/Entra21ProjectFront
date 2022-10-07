import { createURL } from 'expo-linking';
import { useEffect } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg'

export default props => {
    const wallet = props.navigation.getState().routes[3].params.wallet.split(".p.")
    const walletCode = wallet[0]
    const walletName = wallet[1]
    return (
        <View>
            <TouchableOpacity>
                <Text> Você deseja registrar a Wallet:{walletName} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(createURL("/Home"))}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}    