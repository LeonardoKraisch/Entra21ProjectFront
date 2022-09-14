import { View, Text, StyleSheet } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <Text>
                Main Wallet
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '85%',
        width: '90%',
        backgroundColor: '#42889F',
        borderRadius: 20
    }
})