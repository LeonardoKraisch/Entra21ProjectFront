import { createURL } from 'expo-linking';
import { useEffect } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg'

export default props => {
    var inviteRoute = null
    props.navigation.getState().routes.forEach(route => {
        if (route.name == "WalletInvites")
        inviteRoute = route
    })
    const wallet = inviteRoute.params.wallet.split(".p.")
    const walletCode = wallet[0]
    const walletName = wallet[1]
    return (
        <View>
            <TouchableOpacity>
                <Text> Você deseja registrar a Wallet:{null} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(createURL("/Home"))}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}    