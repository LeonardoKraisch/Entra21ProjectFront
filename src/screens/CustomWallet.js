import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import useMoney from "../data/hooks/useMoney";
import WalletFilters from "../components/Wallet/WalletFilters";
import CustomReport from "../components/Wallet/Report";
import SelectDropdown from 'react-native-select-dropdown'

export default props => {
    const { getAllRegistersToWallet } = useMoney()
    const [launches, setLaunches] = useState()
    const [wallet, setWallet] = useState()
    const [wallets, setWallets] = useState([props.route.params.wallet.wallet.walletName])
    var customWallets = []

    useEffect(() => {
        async function loadRegisters() {
            try {
                setLaunches(await getAllRegistersToWallet(props.route.params.wallet.wuCode))
                await props.route.params.wallets.forEach((w) => {
                    if(w.wallet.walletName != props.route.params.wallet.wallet.walletName) {
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

    const [showFilters, setShowFilters] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [date, setDate] = useState(new Date())

    const dateStringUser = moment(date).format('MMMM[/]YYYY')

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

    const ShowReport = () => {
        return (
            <CustomReport launches={launches} />
        )
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

    return (
        <LinearGradient colors={['#192b6a', '#243e9c', '#3155d6']} style={styles.container}>
            <View style={styles.filters}>  
                    <SelectDropdown
                        buttonTextStyle={{
                            color: '#FFF',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}
                        rowTextStyle={{
                            color: '#FFF',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}
                        defaultButtonText={props.route.params.wallet.wallet.walletName}
                        buttonStyle={{ backgroundColor: '#192b6a', borderBottomColor: '#FFF', borderBottomWidth: 1, height: 28, paddingHorizontal: 5 }}
                        dropdownStyle={{ backgroundColor: '#192b6a' }}
                        data={wallets}
                        onSelect={(selected, i) => {
                            setWallet(selected)
                        }}
                    /> 
                <DatePicker />
            </View>
            <Filters />
            <View style={{ flex: 1, padding: 10 }}>
                <ShowReport />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filters: {
        borderRadius: 3,
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
    },
    selected: {
        color: '#FFF',
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
        color: '#FFF',
        fontWeight: 'bold'
    },
    secondaryContainer: {
        borderBottomStartRadius: 3,
        borderBottomEndRadius: 3,
    },
    buttonContainer: {
        width: '27%',
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderColor: '#CCC',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 50
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
})

