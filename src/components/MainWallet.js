import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";

import useMoney from "../data/hooks/useMoney";

export default props => {
    const { total, expenses } = useMoney()

    const pieData = [
        {
            name: 'Total Left',
            values: total - expenses,
            color: '#ffffff',
            legendFontColor: '#FFF',
            legendFontSize: 15,
        },
        {
            name: 'Expenses',
            values: expenses,
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
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={styles.labelText}>
                    Main Wallet
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("Wallet")}>
                    <Text style={styles.labelButton}>
                        Details
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.chartContainer}>
                <MyPieChart />
            </View>
        </View>
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
    labelButton: {
        color: '#FFF',
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