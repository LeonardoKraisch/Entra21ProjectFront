import { View, Text, StyleSheet } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <Text>
                Custom Wallet
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flex: 1,
        backgroundColor: '#902',
        borderRadius: 20,
        margin: 15,
    }
})