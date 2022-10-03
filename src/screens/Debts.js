import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";

export default props => {
    return (
        <View>
            <View>
                <Text>My Debts Schedule</Text>
            </View>
            <FlatList data={props.launches}
                keyExtractor={item => Math.random()}
                renderItem={({ item }) => <Register {...item} />} />
        </View>
    )
}