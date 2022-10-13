import React from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { VictoryChart, VictoryLine, VictoryClipContainer, VictoryZoomContainer } from "victory-native";

export default props => {

    const savings = [
        { month: "janeiro", value: 200 },
        { month: "fevereiro", value: 350 },
        { month: "março", value: 152 },
        { month: "abril", value: 410 },
        { month: "maio", value: 326 },
        { month: "junho", value: 200 },
        { month: "julho", value: 350 },
        { month: "agosto", value: 152 },
        { month: "setembro", value: 410 },
        { month: "outubro", value: 326 }
    ]

    const MyPieChart = () => {
        return (
            <VictoryChart
                width={600}
                height={470}

            >
                <VictoryLine
                    style={{
                        data: { stroke: "tomato" }
                    }}
                    data={savings}
                    x="month"
                    y="value"
                />
            </VictoryChart>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={styles.labelText}>
                    Main Wallet
                </Text>
            </View>
            <ScrollView style={styles.chartContainer}>
                <MyPieChart />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20
    },
    label: {
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
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

    },
})
