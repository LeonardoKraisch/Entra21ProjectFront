import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from 'react-native-calendars'
import { Card } from "react-native-paper";

import useMoney from "../data/hooks/useMoney"

const timeToString = (time) => {
    const date = new Date(time);
    console.log(date)
    return date.toISOString().split('T')[0];
}

export default props => {
    const { getPendings, expPendings , incPendings} = useMoney()
    const [items, setItems] = useState({})
    const [allPendings, setAllPendings] = useState({})

    // const loadItems = (day) => {

    //     setTimeout(() => {
    //         for (let i = -15; i < 85; i++) {
    //             const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //             const strTime = timeToString(time);

    //             if (!items[strTime]) {
    //                 items[strTime] = [];
    //             }
    //         }

    //         const newItems = {};
    //         Object.keys(items).forEach(key => {
    //             newItems[key] = items[key];
    //         });
    //         setItems(newItems);
    //     }, 1000);
    // }

    const generaliza = () => {
        getPendings()
        incPendings.forEach(
            (item) => {
                allPendings[item.incDate] = item    
            }
        )
        expPendings.forEach(
            (item) => {
                allPendings[item.incDate] = item    
            }
        )
    }

    const renderItem = (item) => {
        console.log(item);
        return (
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text>{allPendings[timeToString(item)]}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                // loadItemsForMonth={loadItems}
                selected={new Date()}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={true}
                futureScrollRange={12}
                pastScrollRange={6}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});
