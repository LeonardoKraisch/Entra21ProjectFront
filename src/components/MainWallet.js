import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";

import useMoney from "../data/hooks/useMoney";

export default props => {
    const { total, expenses } = useMoney()

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    // const pieData = [
    //     {
    //         name: 'Total',
    //         values: total,
    //         color: '#ffffff',
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //     },
    //     {
    //         name: 'Expenses',
    //         values: expenses,
    //         color: '#aaaaaa',
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //     }
    // ]

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text>
                    Main Wallet
                </Text>
            </View>
            <View>
                <PieChart
                    data={pieData}
                    width={100}
                    height={100}
                    chartConfig={chartConfig}
                    accessor="values"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
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