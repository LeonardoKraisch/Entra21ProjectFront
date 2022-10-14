import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryPie } from "victory-native";

import useMoney from "../../data/hooks/useMoney";

export default props => {
    const { balance, totalExp, totalInc, recalBalance } = useMoney()
    const [data, setData] = useState(balance)
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        async function fetch() {
            setData(await recalBalance())
        }
        fetch()
    }, [totalInc, totalExp])

    const pieData = [
        {
            id: "1",
            name: 'Total Left',
            value: data,
            color: '#243e9c',
        },
        {
            id: "2",
            name: 'Expenses',
            value: totalExp,
            color: '#c63222',
        }
    ]


    const MyDonutChart = () => {
        return (
            <VictoryPie
                data={pieData}
                x="name"
                y="value"
                colorScale={pieData.map(data => data.color)}
                width={210}
                innerRadius={30}
                style={{
                    data: {
                        fillOpacity: 0.9, stroke: '#353935', strokeWidth: 4
                    },
                    labels: {
                        fontSize: 16, fill: '#FFF', padding: 8
                    }
                }}
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
                <MyDonutChart />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '92%',
        backgroundColor: '#353935',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
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
        maxWidth: '50%',
        alignItems: 'center'
    },
})