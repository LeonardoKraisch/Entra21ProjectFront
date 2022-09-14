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
        height: '90%',
        width: '90%',
        backgroundColor: '#902',
        borderRadius: 20
    }
})