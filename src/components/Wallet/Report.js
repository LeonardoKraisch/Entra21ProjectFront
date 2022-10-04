import React from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { TextMask } from "react-native-masked-text";

import Register from "./Register";

export default props => {

    const RegistersList = () => {
        return (
            <FlatList data={props.launches}
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

                        <TextMask type={'money'}
                            value={props.total}
                            style={styles.headerText}
                            options={{
                                precision: 2,
                                separator: ',',
                                unit: props.total > 0 ? 'R$' : 'R$-',
                                delimiter: '.',
                                suffixUnit: ''

                            }}
                        />
                    </View>
                </View>
                <View style={styles.headerBottom}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Category</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Date</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Parcel</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Value</Text>
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
        backgroundColor: '#EEE',
        borderRadius: 5,
        alignSelf: 'center',
        padding: 5
    },
    header: {
        width: '100%',
    },
    headerTop: {
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: '#3C3C3C',
        borderBottomWidth: 1,
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 3
    },
    headerBottom: {
        width: '98%',
        alignSelf: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',
        margin: 3
    },
    textContainer: {
        width: '23%',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
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
        maxHeight: "85%"
    },
})
