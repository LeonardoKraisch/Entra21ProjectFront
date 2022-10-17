import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Agenda } from 'react-native-calendars'
import { Card } from "react-native-paper";
import { TextMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import useMoney from "../data/hooks/useMoney"

export default props => {
    const { allPendings, delRegister, editRegister, getPendings, showToast, debtsState, refreshDebts } = useMoney()
    const [modalVisible, setModalVisible] = useState(false)
    const [item, setItem] = useState()

    useEffect(() => {
        async function fetch() {
            try {
                reloadAgenda()
                return await getPendings()
            } catch (e) {
                console.log(e);
                return []
            }
        }
        setItem(fetch())
        
    }, [debtsState, item])

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
        await showToast(await delRegister(code), "Delete")
        setRefresh(null)
        setModalVisible(false)
    }

    const editEntry = async (register) => {
        await showToast(await editRegister(register), "Edit")
        setRefresh(null)
        setModalVisible(false)
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
                                            <FontAwesome size={27} name="trash-o" color="#FFF" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.modalButtonsConfirm}>
                                        <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)} >
                                            <FontAwesome name="close" size={27} color="#FFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => editEntry(item.incCode ?
                                            {
                                                type: "+",
                                                code: item.incCode
                                            } : {
                                                type: "-",
                                                code: item.expCode
                                            }
                                        )} style={styles.buttonOk}>
                                            <MaterialIcons size={28} name="done" color="#FFF" />
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
                items={allPendings}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={true}
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
        justifyContent: 'center'
    },
    negationText: {
        fontSize: 17,
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
        backgroundColor: "white",
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
        fontSize: 18,
        padding: 2,
        fontWeight: 'bold'
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
        backgroundColor: '#23a2e2',
        paddingVertical: 5,
        paddingHorizontal: 9,
        borderRadius: 20,
    },
    buttonOk: {
        backgroundColor: '#23a2e2',
        padding: 5,
        borderRadius: 20,
        marginLeft: 10
    },
    buttonTrash: {
        backgroundColor: '#de1f29',
        paddingVertical: 5,
        paddingHorizontal: 9,
        borderRadius: 20,
    },
    buttonTrashView: {
        justifyContent: 'flex-start'
    },
});
