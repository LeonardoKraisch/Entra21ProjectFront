import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from 'react-native'

export default props => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Launches</Text>
                <View style={styles.headerValues}>
                    <Text style={styles.headerText}>Total:</Text>
                    <Text style={styles.headerText}>{props.total}</Text>
                </View>
            </View>
            <View style={styles.info}>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 10,
        backgroundColor: '#DDD',
        borderRadius: 5,
        alignSelf: 'center'
    },
    header: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#333'
    },
    headerValues: {
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 10
    },
    info: {
        flexDirection: "row",
        padding: 10,
    },
})

