import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import SelectDropdown from 'react-native-select-dropdown'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import useMoney from "../data/hooks/useMoney";
import WalletFilters from "../components/Wallet/WalletFilters";
import CustomReport from "../components/Wallet/Report";

export default props => {
    const { getAllRegistersToWallet, deleteWallet, showToast } = useMoney()
    const [show, setShow] = useState("expenses")
    const [launches, setLaunches] = useState()
    const [wallet, setWallet] = useState()
    const [wallets, setWallets] = useState([props.route.params.wallet.wallet.walletName])
    const [showPass, setShowPass] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [showFilters, setShowFilters] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [date, setDate] = useState(new Date())

    const dateStringUser = moment(date).format('MMMM[/]YYYY')

    var customWallets = []

    useEffect(() => {
        async function loadRegisters() {
            try {
                setLaunches(await getAllRegistersToWallet(props.route.params.wallet.wuCode))
                await props.route.params.wallets.forEach((w) => {
                    if (w.wallet.walletName != props.route.params.wallet.wallet.walletName) {
                        customWallets.push(w.wallet.walletName)
                    }
                })
                setWallets([...wallets, ...customWallets])
                setWallet(wallets[0])
            } catch (e) {
                console.log(e);
            }
        }
        loadRegisters()
    }, [])


    const ShowReport = () => {
        if (show == "expenses") {
            return (
                <CustomReport launches={launches ? launches.toWalletExp : launches} />
            )
        } else if (show == "incomes") {
            return (
                <CustomReport launches={launches ? launches.toWalletInc : launches} />
            )
        } else {
            return (
                <CustomReport launches={launches ? launches.merged : launches} />
            )
        }
    }

    const DatePicker = () => {
        let datePicker = <DateTimePicker display="spinner" value={date} onChange={(_, date) => {
            setDate(date)
            setShowDatePicker(false)
        }} mode='date' />

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={styles.datePicker}>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.date}>
                            {dateStringUser}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    const Filters = () => {
        if (showFilters) {
            return (
                <View style={styles.secondaryContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setShowFilters(false)}>
                            <Text style={styles.buttonText}>- Filters</Text>
                        </TouchableOpacity>
                    </View>
                    <WalletFilters show={show} />
                </View>
            )
        } else {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setShowFilters(true)}>
                        <Text style={styles.buttonText}>+ Filters</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const delWallet = async () => {
        await showToast(await deleteWallet(props.route.params.wallet.wuCode), "Wallet delete")
        setShowModal(false)
    }

    return (
        <LinearGradient colors={['#353935', '#adb312', '#f2fa16']} style={styles.container}>
            <TouchableOpacity style={styles.buttonTrash} onPress={() => setShowModal(true)}>
                <FontAwesome size={27} name="trash-o" color="#F5FEFD" />
            </TouchableOpacity>
            <View style={styles.filters}>
                <SelectDropdown
                    buttonTextStyle={{
                        color: '#F5FEFD',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                    rowTextStyle={{
                        color: '#F5FEFD',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                    defaultButtonText={props.route.params.wallet.wallet.walletName}
                    buttonStyle={{ backgroundColor: '#192b6a10', borderBottomColor: '#F5FEFD', borderBottomWidth: 1, height: 28, paddingHorizontal: 5, marginBottom: 5 }}
                    dropdownStyle={{ backgroundColor: '#192b6a' }}
                    data={wallets}
                    onSelect={(selected, i) => {
                        setWallet(selected)
                    }}
                />
                <View style={styles.label}>
                    {showPass ?
                        <Text style={styles.labelText}>
                            PASSWORD: {props.route.params.wallet.wallet.walletPasswd}
                        </Text>
                        :
                        <Text style={styles.labelText}>
                            CODE: {props.route.params.wallet.wallet.walletCode}
                        </Text>}
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        <Ionicons name="key-outline" size={25} color={showPass ? "red" : "#F5FEFD"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.mainFilters}>
                    <TouchableOpacity onPress={() => setShow("expenses")}>
                        <Text style={[show == "expenses" ? styles.selected : styles.unselect]}>
                            Expenses
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShow("incomes")}>
                        <Text style={[show == "incomes" ? styles.selected : styles.unselect]}>
                            Incomes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShow("all")}>
                        <Text style={[show == "all" ? styles.selected : styles.unselect]}>
                            All launches
                        </Text>
                    </TouchableOpacity>
                </View>
                <DatePicker />
            </View>
            <Filters />
            <View style={{ flex: 1, padding: 10 }}>
                <ShowReport />
            </View>
            <Modal visible={showModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalExclude}>
                    <Card style={styles.cardExclude}>
                        <Text style={styles.textExclude}>Are you certain about deleting this wallet?</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.confirmExclusion}>
                                <MaterialCommunityIcons size={35} name="cancel" color="#a410e6" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => delWallet()} style={styles.confirmExclusion}>
                                <MaterialIcons size={35} name="done" color="#157de6" />
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </Modal>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonTrash: {
        paddingRight: 10,
        paddingTop: 10,
        alignSelf: 'flex-end'
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderBottomColor: '#F5FEFD',
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F5FEFD'
    },
    filters: {
        borderRadius: 3,
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#F5FEFD',
        borderBottomWidth: 2,
    },
    mainFilters: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        padding: 5,
        marginBottom: 5,
        borderBottomColor: '#F5FEFD',
        borderBottomWidth: 1,
    },
    selected: {
        color: '#F5FEFD',
        fontWeight: 'bold',
        fontSize: 16
    },
    unselect: {
        fontSize: 15,
        color: '#CCC'
    },
    datePicker: {
        paddingHorizontal: 5,
        marginHorizontal: 5
    },
    date: {
        fontSize: 15,
        color: '#F5FEFD',
        fontWeight: 'bold'
    },
    secondaryContainer: {
        borderBottomStartRadius: 3,
        borderBottomEndRadius: 3,
    },
    buttonContainer: {
        paddingHorizontal: 15,
        paddingVertical: 2,
    },
    buttonText: {
        color: '#F5FEFD',
        fontSize: 15,
        fontWeight: 'bold'
    },
    modalExclude: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardExclude: {
        width: '50%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#353935'
    },
    textExclude: {
        padding: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: '#F5FEFD'
    },
    confirmExclusion: {
        marginTop: 12,
        marginRight: 12,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    buttons: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 7,
        paddingTop: 5,
        justifyContent: 'space-between'
    }
})

