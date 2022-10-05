import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Agenda } from 'react-native-calendars'
import { Card } from "react-native-paper";
import { TextMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useMoney from "../data/hooks/useMoney"

export default props => {
    const { generalPendings, allPendings, pendingOne } = useMoney()
    const [modalVisible, setModalVisible] = useState(false)
    const [item, setItem] = useState(pendingOne)

    useEffect(() => {
        async function fetch() {
            setItem(await generalPendings())
        }
        fetch()
    }, [allPendings])

    const renderItem = (item) => {
        const table = item.incMoney ? "inc" : "exp"
        return (
            <View style={[styles[`${table}ItemOut`], styles.item]}>
                <TouchableOpacity onPress={() => { setItem(item), setModalVisible(true) }}>
                    <View>
                        <Text style={styles.title}>{item.incMoney ? "Income" : "Expense"}</Text>
                    </View>
                    <Card style={[styles[`${table}Item`], styles.item]}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Description:</Text>
                                <Text style={styles.value}>{item[`${table}Description`]}</Text>
                                <Text style={styles.value}>{item[`${table}Date`]}</Text>
                                <Text style={styles.value}>{item[`${table}Code`]}</Text>
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
        );
    }

    // const ModalFunc = () => {
    //     if (item) {
    //         return (

    //         )
    //     }
    // }

    return (
        <View style={styles.container}>
            <Agenda
                items={allPendings}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={true}
                futureScrollRange={12}
                pastScrollRange={6}
                renderItem={renderItem}
            />
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={[item["incMoney"] ? styles.incItemOut : styles.expItemOut, styles.item]}>
                    <View>
                        <Text style={styles.title}>{item.incMoney ? "Income" : "Expense"}</Text>
                    </View>
                    <Card style={[item.incMoney ? styles.incItem : styles.expItem, styles.item]}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Description:</Text>
                                <Text style={styles.value}>{item[item.incDescription ? "incDescription" : "expDescription"]}</Text>
                                <Text style={styles.value}>{item[item.incDate ? "incDate" : "expDate"]}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Category:</Text>
                                <Text style={styles.value}>{item[item.incCategory ? "incCategory" : "expCategory"]}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Value:</Text>
                                <TextMask style={styles.value} value={item[item.incMoney ? "incMoney" : "expMoneyincMoney"]} options={{
                                    precision: 2,
                                    separator: ',',
                                    unit: 'R$',
                                    delimiter: '.',
                                    suffixUnit: ''
                                }} type="money" />
                            </View>
                        </Card.Content>
                    </Card>
                </View>

                <View style={styles.modalButtons}>
                    <TouchableOpacity>
                        <MaterialIcons size={20} name="done" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome size={20} name="trash-o" />
                    </TouchableOpacity>
                </View>
            </Modal>
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
    modalButtons: {
        flexDirection: 'row',
    }
});
