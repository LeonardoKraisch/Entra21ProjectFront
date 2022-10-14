import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory-native";
import { Button } from "react-native-paper";

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
                        data: { stroke: "green" }
                    }}
                    data={savings}
                    x="month"
                    y="value"
                />
            </VictoryChart>
        );
    };

    return (
        <LinearGradient colors={['#192b6a', '#243e9c', '#3155d6']} style={styles.container}>
            <View style={styles.label}>
                <Text style={styles.labelText}>My Savings</Text>
            </View>
            <View style={styles.chartContainer}>
                <MyChart />
            </View>
            <Button onPress={() => props.navigation.goBack()} style={styles.buttonBack}>
                <Text style={styles.buttonBackText}>
                    Back
                </Text>
            </Button>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
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
    chartContainer: {
        height: '25%',
        width: '95%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10
    },
    buttonBack: {
        flex: 1,
        right: 10,
        bottom: 10,
        position: 'absolute',
        backgroundColor: '#353935',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        elevation: 3
    },
    buttonBackText: {
        color: '#FFF'
    }
})
