import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native'

export default props => {
    return (
        <View style={styles.info}>
            <View>
                <Text>Total:</Text>
            </View>
            <View>
                <Text>{props.total}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        height: '80%',
        width: '100%',
        flexDirection: "row"
    },
})

