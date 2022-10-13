import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryChart, VictoryLine, VictoryClipContainer } from "victory-native";

export default props => {

    const savings = [
        { month: "janeiro", value: 200 },
        { month: "fevereiro", value: 350 },
        { month: "março", value: 152 },
        { month: "abril", value: 410 },
        { month: "maio", value: 326 }
    ]

    const MyPieChart = () => {
        return (
            <VictoryChart>
                <VictoryLine
                    groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }} />}
                    style={{ data: { stroke: "#c43a31", strokeWidth: 15, strokeLinecap: "round" } }}
                    data={savings}
                    x={"month"}
                    y={"value"}
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
            <View style={styles.chartContainer}>
                <MyPieChart />
            </View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
