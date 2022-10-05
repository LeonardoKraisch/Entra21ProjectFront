import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Agenda } from 'react-native-calendars'
import { Card } from "react-native-paper";
import { TextMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useMoney from "../data/hooks/useMoney"

export default props => {
    const { expPendings, incPendings } = useMoney()
    const [allPendings, setAllPendings] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        async function fetch() {
            generalPendings()
            setData(await allPendings[0])
            console.log(data);
        }
        fetch()
    }, [expPendings, incPendings])

    const generalPendings = async () => {
        try {
            for (let item of incPendings) {
                if (allPendings[item.incDate] != null && allPendings[item.incDate][0].incDate == item.incDate) {
                    await allPendings[item.incDate].push(item)
                } else {

                    allPendings[item.incDate] = [item]
                }
            }
            await expPendings.forEach(
                (item) => {
                    if (allPendings[item.expDate]) {
                        allPendings[item.expDate].push(item)
                    } else {
                        allPendings[item.expDate] = [item]
                    }
                }
            )

            console.log(allPendings)
        } catch (e) {
            console.log(e.message)
        }
    }

    const renderItem = (item) => {
        const table = item.incMoney ? "inc" : "exp"
        return (
            <View style={[styles[`${table}ItemOut`], styles.item]}>
                <TouchableOpacity onPress={() => { setData(item) }}>
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

            {/* <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={[data.incMoney ? styles.incItemOut : styles.expItemOut, styles.item]}>
                    <View>
                        <Text style={styles.title}>{data.incMoney ? "Income" : "Expense"}</Text>
                    </View>
                    <Card style={[data.incMoney ? styles.incItem : styles.expItem, styles.item]}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Description:</Text>
                                <Text style={styles.value}>{data[0][data[0].incDescription ? "incDescription" : "expDescription"]}</Text>
                                <Text style={styles.value}>{data[0][data[0].incDate ? "incDate" : "expDate"]}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Category:</Text>
                                <Text style={styles.value}>{data[0][data[0].incCategory ? "incCategory" : "expCategory"]}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.labels}>Value:</Text>
                                <TextMask style={styles.value} value={data[0][data[0].incMoney ? "incMoney" : "expMoneyincMoney"]} options={{
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
            </Modal> */}

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
