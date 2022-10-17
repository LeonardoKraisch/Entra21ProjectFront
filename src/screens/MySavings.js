import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory-native";
import { Card } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';

export default props => {

    const [date, setDate] = useState(new Date().getFullYear())

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

    const MyChart = () => {
        return (
            <VictoryChart
                width={Dimensions.get('window').width - 10}
                height={Dimensions.get('window').height / 4}
                domain={{ x: [0, 11], y: [-1000, 1000] }}
                containerComponent={<VictoryZoomContainer
                    allowZoom={false}
                    zoomDomain={{ x: [0, 5], y: [-1000, 1000] }} />
                }
            >
                <VictoryLine
                    style={{
                        data: { stroke: '#32c622' },
                    }}
                    data={savings}
                    x="month"
                    y="value"
                />
            </VictoryChart>
        );
    };

    const MyCard = props => {
        return (
            <Card style={[styles.card, props.value > 0 ? styles.cardUp : styles.cardDown]}>
                <Text style={styles.title}>{props.month}</Text>
                <Card.Content style={{ alignItems: 'flex-end', width: '100%' }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Total: {props.value}</Text>
                </Card.Content>
            </Card>
        )
    }

    const MyList = () => {
        return (
            <FlatList data={savings}
                keyExtractor={item => Math.random()}
                renderItem={({ item }) => <MyCard {...item} />}
            />
        )
    }

    return (
        <LinearGradient colors={['#192b6a', '#243e9c', '#3155d6']} style={styles.container}>
            <View style={styles.label}>
                <Text style={styles.labelText}>My Savings</Text>
            </View>

            <View style={styles.dateSetter}>
                <TouchableOpacity onPress={() => setDate(date - 1)}>
                    <AntDesign name='caretleft' size={20} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.year}>
                    {date}
                </Text>
                <TouchableOpacity onPress={() => setDate(date + 1)}>
                <AntDesign name='caretright' size={20} color="#FFF"/>
                </TouchableOpacity>
            </View>
            <View style={styles.chartContainer}>
                <MyChart />
            </View>
            <View style={styles.listView}>
                <MyList />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 10
    },
    label: {
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginVertical: 25
    },
    labelText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25
    },
    dateSetter: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10
    },
    year: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: '500'
    },
    chartContainer: {
        height: '20%',
        width: '95%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    listView: {
        paddingTop: 5,
        flex: 1,
        width: '95%',
    },
    card: {
        padding: 5,
        marginVertical: 10,
        borderStartWidth: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    cardUp: {
        borderStartColor: '#32c622',
    },
    cardDown: {
        borderStartColor: '#c63222',
    },
    title: {
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

})
