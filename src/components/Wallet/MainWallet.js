import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextMask } from "react-native-masked-text";
import { VictoryPie } from "victory-native";
import moment from 'moment';

import useMoney from "../../data/hooks/useMoney";

export default props => {
    const { balance, totalExp, totalInc, getUserMoney, refreshUserMoney } = useMoney()
    const [localBalance, setLocalBalance] = useState(0)

    useEffect(() => {
        async function fetch() {
            setLocalBalance(await getUserMoney())
            await refreshUserMoney()
        }
        fetch()
    }, [])

    const CalcPercentage = () => {
        return (
            <View style={{ position: 'absolute' }}>
                <Text style={{ color: '#F5FEFD', fontWeight: 'bold', fontSize: 16 }}>
                    {totalInc > 0 ? parseFloat((100 * totalExp) / totalInc).toFixed(2) : parseFloat((100 * totalExp) / 1).toFixed(2)}%
                </Text>
            </View>
        )
    }

    const pieData = localBalance >= 0 ? [
        {
            id: "1",
            name: 'Total Left',
            value: localBalance,
            color: '#157de6',
        },
        {
            id: "2",
            name: 'Expenses',
            value: totalExp,
            color: '#a410e6',
        }
    ] : [
        {
            id: "1",
            name: 'Total Left',
            value: totalExp,
            color: '#a410e6',
        }
    ]


    const MyDonutChart = () => {
        return (
            <VictoryPie
                data={pieData}
                x="name"
                y="value"
                colorScale={pieData.map(data => data.color)}
                width={230}
                innerRadius={35}
                style={{
                    data: {
                        fillOpacity: 0.9, stroke: '#353935', strokeWidth: 2
                    },
                    labels: {
                        fontSize: 0
                    },
                    parent: {
                        margin: -125,
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
            <View style={styles.content}>
                <View style={styles.dataContainer}>
                    <Text style={{ fontSize: 17, color: '#F5FEFD' }}>
                        {moment(new Date()).format("MMMM[/]YYYY")}
                    </Text>
                    <Text style={{ fontSize: 17, color: '#F5FEFD', padding: 10 }}>Expenses</Text>
                    <TextMask type={'money'}
                        value={totalExp}
                        options={{
                            precision: 2,
                            separator: ',',
                            unit: 'R$ ',
                            delimiter: '.',
                            suffixUnit: ''
                        }} style={{ color: '#F5FEFD', fontSize: 22, fontWeight: 'bold' }} />
                </View>
                <View style={styles.chartContainer}>
                    <View style={styles.chart}>
                        <MyDonutChart />
                        <CalcPercentage />
                    </View>
                </View>
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
        borderBottomColor: '#157de6',
        borderBottomWidth: 1,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    labelText: {
        color: '#F5FEFD',
        fontWeight: 'bold',
        fontSize: 16
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    chartContainer: {
        width: '50%',
        maxHeight: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chart: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})