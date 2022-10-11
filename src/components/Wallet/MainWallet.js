import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";

import useMoney from "../../data/hooks/useMoney";

export default props => {
    const { balance, totalExp, totalInc, recalBalance } = useMoney()
    const [data, setData] = useState(balance)

    useEffect(() => {
        async function fetch() {
            setData(await recalBalance())
        }
        fetch()
    }, [totalInc, totalExp])

    const pieData = data >= 0 ? [
        {
            name: 'Total Left',
            values: data,
            color: '#243e9c',
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
    ] : [
        {
            name: 'Monthly incomes',
            values: totalInc,
            color: '#243e9c',
            legendFontColor: '#FFF',
            legendFontSize: 15,
        },
        {
            name: 'Over the budget',
            values: totalExp - totalInc,
            color: '#c63222',
            legendFontColor: '#FFF',
            legendFontSize: 15,

        }
    ]


    const MyPieChart = () => {
        return (
            <PieChart
                data={pieData}
                width={320}
                height={120}
                center={[25, 0]}
                chartConfig={{
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(230, 103, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                absolute
                accessor="values"
                avoidFalseZero={true}
                paddingLeft={-50}
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
        height: '95%',
        width: '92%',
        backgroundColor: '#353935',
        borderRadius: 3,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        paddingVertical: 10,
        justifyContent: 'center',
        flex: 1
    }
})