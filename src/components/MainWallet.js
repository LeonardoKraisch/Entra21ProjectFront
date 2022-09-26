import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";

import useMoney from "../data/hooks/useMoney";

export default props => {
    const { total } = useMoney()

    const pieData = [
        {
            name: 'Total',
            values: total,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },

    ]

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text>
                    Main Wallet
                </Text>
            </View>
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '85%',
        width: '90%',
        backgroundColor: '#32779E',
        borderRadius: 10
    }
})