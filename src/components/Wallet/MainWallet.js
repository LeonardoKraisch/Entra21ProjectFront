import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";

import useMoney from "../../data/hooks/useMoney";

export default props => {
    const { balance, totalExp, totalInc } = useMoney()

    const pieData = [
        {
            name: 'Total Left',
            values: balance,
            color: '#ffffff',
            legendFontColor: '#FFF',
            legendFontSize: 15,
        },
        {
            name: 'Expenses',
            values: totalExp,
            color: '#c63222',
            legendFontColor: '#FFF',
            legendFontSize: 15,

        }
    ]

    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    const MyPieChart = () => {
        return (
            <PieChart
                data={pieData}
                width={350}
                height={120}
                center={[-10, 0]}
                chartConfig={chartConfig}
                style={styles.chart}
                accessor="values"
                backgroundColor={"transparent"}
                avoidFalseZero={true}

            />
        );
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate("Wallet")}>
            <View style={styles.label}>
                <Text style={styles.labelText}>
                    Main Wallet
                </Text>
            </View>
            <View style={styles.chartContainer}>
                <MyPieChart />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '85%',
        width: '90%',
        backgroundColor: '#32779E',
        borderRadius: 3,
    },
    label: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    labelText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    chart: {
        paddingVertical: 10,
        justifyContent: 'center',
        flex: 1
    }
})