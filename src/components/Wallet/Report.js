import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Register from "./Register";

export default props => {
    const data = [
        {
            incMoney: 20.50,
            incCategory: "food",
            incDate: "2022-09-28",
            incDescription: "salada",
            parcelCode: 1
        },
        {
            incMoney: 20.50,
            incCategory: "food",
            incDate: "2022-09-28",
            incDescription: "salada",
            parcelCode: 1
        }
    ]
    const [registers, setRegisters] = useState(data)

    const RegistersList = () => {
        return (
            <FlatList data={data}
                keyExtractor={item => Math.random()}
                renderItem={({ item }) => <Register {...item} />} />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Launches</Text>
                    <View style={styles.headerValues}>
                        <Text style={styles.headerText}>Total:</Text>
                        <Text style={styles.headerText}>{props.total}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.info}>
                <RegistersList />
            </View>
        </View>
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
        width: '100%',
        flexDirection: 'row',
    },
    headerTop: {
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        justifyContent: "space-between"
    },
    headerValues: {
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#333'
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

