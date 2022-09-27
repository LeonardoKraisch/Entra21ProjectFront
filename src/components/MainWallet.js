import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

import useMoney from "../data/hooks/useMoney";

export default props => {
    const { total, expenses } = useMoney()

    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    const pieData = [
        {
            name: 'Total Left',
            values: total - expenses,
            color: '#ffffff',
            legendFontColor: '#000',
            legendFontSize: 15,
        },
        {
            name: 'Expenses',
            values: expenses,
            color: '#aaaaaa',
            legendFontColor: '#000',
            legendFontSize: 15,
        }
    ]

    const MyPieChart = () => {
        return (
            <View style={styles.graph}>
                <PieChart
                    data={pieData}
                    width={300}
                    height={100}
                    chartConfig={chartConfig}
                    style={{
                        marginVertical: 8,
                    }}
                    accessor="values"
                    backgroundColor="transparent"
                    paddingLeft="5" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text>
                    Main Wallet
                </Text>
            </View>
            <MyPieChart />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '85%',
        width: '90%',
        backgroundColor: '#32779E',
        borderRadius: 10,
    },
    graph: {
        flex: 1 
    }
})