import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory-native";

export default props => {

    const savings = [
        { month: "jan", value: 200 },
        { month: "feb", value: 350 },
        { month: "mar", value: 152 },
        { month: "apr", value: 410 },
        { month: "may", value: -326 },
        { month: "jun", value: 200 },
        { month: "jul", value: 350 },
        { month: "aug", value: 152 },
        { month: "sep", value: 410 },
        { month: "oct", value: 326 }
    ]

    const MyPieChart = () => {
        return (
            <VictoryChart
                width={Dimensions.get('window').width}
                height={270}
                domain={{ x: [0, 11], y: [-1000, 1000] }}
                containerComponent={<VictoryZoomContainer
                    allowZoom={false}
                    zoomDomain={{ x: [0, 5], y: [-1000, 1000] }} />
                }
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
