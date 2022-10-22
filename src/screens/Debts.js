import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, RefreshControl } from "react-native";
import { Agenda } from 'react-native-calendars'
import { Card } from "react-native-paper";
import { TextMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useMoney from "../data/hooks/useMoney"

export default props => {
    const { delRegister, editRegister, generalPendings, showToast, allPendings } = useMoney()
    const [modalVisible, setModalVisible] = useState(false)
    const [item, setItem] = useState()
    const [allItems, setAllItems] = useState(allPendings)
    var pendings = {}

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {

        try {
            pendings = await generalPendings()
            setAllItems(pendings)
            setItem(pendings[Object.keys(pendings)[0]][0])
        } catch (e) {
            console.log(e, "refresh");
            setAllItems(pendings)
            setItem(pendings)
        }
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    })

    useEffect(() => {
        onRefresh()
    }, [])

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


    const deleteEntry = async (code) => {
        setModalVisible(false)
        await showToast(await delRegister(code), "Delete")
        onRefresh()
    }

    const editEntry = async (register) => {
        setModalVisible(false)
        await showToast(await editRegister(register), "Edit")
        onRefresh()
    }

    const ModalView = () => {
        if (item) {
            return (
                <Modal animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalExtern}>
                        <View style={styles.modalView}>
                            <Card style={[item.incMoney ? styles.incItemOut : styles.expItemOut, styles.modalItemOut]}>
                                <View>
                                    <Text style={styles.title}>{item.incMoney ? "Income" : "Expense"}</Text>
                                </View>
                                <Card.Content style={[item.incMoney ? styles.incItem : styles.expItem, styles.modalItem]}>
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
                                        <TextMask style={styles.value} value={item[item.incMoney ? "incMoney" : "expMoney"]} options={{
                                            precision: 2,
                                            separator: ',',
                                            unit: 'R$',
                                            delimiter: '.',
                                            suffixUnit: ''
                                        }} type="money" />
                                    </View>
                                </Card.Content>
                            </Card>
                            <Text style={styles.textQuestion}>Do you want to set the status</Text>
                            <Text style={styles.textQuestion}> of this launch to "Paid"?</Text>
                            <View style={styles.modalButtons}>
                                <View style={styles.modalButtonsArea}>
                                    <View style={styles.buttonTrashView}>
                                        <TouchableOpacity onPress={() => deleteEntry(item.incCode ?
                                            {
                                                type: "+",
                                                code: item.incCode,
                                                pending: true
                                            } : {
                                                type: "-",
                                                code: item.expCode,
                                                pending: true
                                            }
                                        )} style={styles.buttonTrash}>
                                            <FontAwesome size={27} name="trash-o" color="#F5FEFD" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.modalButtonsConfirm}>
                                        <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)} >
                                            <FontAwesome name="close" size={27} color="#F5FEFD" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => editEntry(item.incCode ?
                                            {
                                                type: "+",
                                                code: item.incCode,
                                                value: item.incMoney

                                            } : {
                                                type: "-",
                                                code: item.expCode,
                                                value: item.expMoney
                                            }
                                        )} style={styles.buttonOk}>
                                            <MaterialIcons size={28} name="done" color="#F5FEFD" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Agenda
                theme={{
                    dayTextColor: '#f2fa16',
                    calendarBackground: '#353935',
                    monthTextColor: '#157de6',
                    selectedDayBackgroundColor: '#157de6',
                    agendaKnobColor: '#a410e6',

                }}
                items={allItems}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
                showClosingKnob={true}
                futureScrollRange={12}
                pastScrollRange={6}
                renderItem={renderItem}
                renderEmptyData={() => <View style={styles.negation}><Text style={styles.negationText}>There are no launches for this day.</Text></View>}
            />
            <ModalView />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    negation: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#353935'
    },
    negationText: {
        fontSize: 17,
        color: '#f2fa16'
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        marginTop: 17,
        minWidth: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    incItemOut: {
        backgroundColor: '#353935',
        borderWidth: 2,
        borderColor: '#157de6'
    },
    expItemOut: {
        backgroundColor: '#353935',
        borderWidth: 2,
        borderColor: '#a410e6'
    },
    incItem: {
        borderColor: '#157de6',
        backgroundColor: '#353935',
        borderWidth: 1
    },
    expItem: {
        borderColor: '#a410e6',
        backgroundColor: '#353935',
        borderWidth: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#f2fa16'
    },
    labels: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F5FEFD'
    },
    value: {
        fontSize: 15,
        color: '#F5FEFD'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    modalExtern: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalItemOut: {
        marginTop: 20,
        flex: 1,
        borderRadius: 5,
        padding: 5,
        minWidth: '90%',
        maxHeight: '40%'
    },
    modalItem: {
        flex: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        minWidth: '90%',
    },
    modalView: {
        flex: 1,
        backgroundColor: "#F5FEFD",
        maxWidth: "90%",
        maxHeight: '40%',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textQuestion: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#353935'
    },
    modalButtons: {
        flexDirection: 'row',
        width: '95%',
        marginTop: 30
    },
    modalButtonsArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        padding: 10,
    },
    modalButtonsConfirm: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonCancel: {
        backgroundColor: '#353935',
        paddingVertical: 5,
        paddingHorizontal: 9,
        borderRadius: 20,
    },
    buttonOk: {
        backgroundColor: '#157de6',
        padding: 5,
        borderRadius: 20,
        marginLeft: 10
    },
    buttonTrash: {
        backgroundColor: '#a410e6',
        paddingVertical: 5,
        paddingHorizontal: 9,
        borderRadius: 20,
    },
    buttonTrashView: {
        justifyContent: 'flex-start'
    },
});
