import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from 'react-native-calendars'
import { Card } from "react-native-paper";
import { TextMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useMoney from "../data/hooks/useMoney"

export default props => {
    const { expPendings, incPendings } = useMoney()
    const [allPendings, setAllPendings] = useState({})

    useEffect(() => {
        generalPendings()
    }, [expPendings, incPendings])

    const generalPendings = async () => {
        try {
            await incPendings.forEach(
                (item) => {
                    if (allPendings[item.incDate]) {
                        allPendings[item.incDate].push(item)
                    } else {
                        allPendings[item.incDate] = [item]
                    }

                }
            )
            await expPendings.forEach(
                (item) => {
                    if (allPendings[item.expDate]) {
                        allPendings[item.expDate].push(item)
                    } else {
                        allPendings[item.expDate] = [item]
                    }
                }
            )
            console.log(allPendings, "aloooooooooooooooooooooooooooo")
        } catch (e) {
            console.log(e.message)
        }
    }

    const renderItem = (item) => {
        var table = item.incMoney ? "inc" : "exp"
        return (
            <View style={[styles[`${table}ItemOut`], styles.item]}>
                <TouchableOpacity>
                    <View>
                        <Text style={styles.title}>{item.incMoney ? "Income" : "Expense"}</Text>
                    </View>
                    <Card style={[styles[`${table}Item`], styles.item]}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Description:</Text>
                                <Text style={styles.value}>{item[`${table}Description`]}</Text>
                                <Text style={styles.value}>{item[`${table}Date`]}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Category:</Text>
                                <Text style={styles.value}>{item[`${table}Category`]}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Value:</Text>
                                <TextMask style={styles.value} value={item[`${table}Money`]} options={{
                                    precision: 2,
                                    separator: ',',
                                    unit: 'R$',
                                    delimiter: '.',
                                    suffixUnit: ''
                                }} type="money" />
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </View>
            //     <View style={styles.buttonRow}>
            //     <TouchableOpacity>
            //         <MaterialIcons size={20} name="done" />
            //     </TouchableOpacity>
            //     <TouchableOpacity>
            //         <FontAwesome size={20} name="trash-o" />
            //     </TouchableOpacity>
            // </View>
        );
    }

    return (
        <View style={styles.container}>
            <Agenda
                items={allPendings}
                // selected={'2022-10-03'}
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
        padding: 5,
        marginRight: 10,
        marginTop: 17,
    },
    incItemOut: {
        backgroundColor: '#238a17'
    },
    expItemOut: {
        backgroundColor: '#8c2216'
    },
    incItem: {
        backgroundColor: '#4ab53e'
    },
    expItem: {
        backgroundColor: '#e05343'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#222'
    },
    labels: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    buttonRow: {
        flexDirection: 'row',
    }
});
