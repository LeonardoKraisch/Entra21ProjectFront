import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import useMoney from "../data/hooks/useMoney";
import WalletFilters from "../components/Wallet/WalletFilters";
import Report from "../components/Wallet/Report";


export default props => {
    const [show, setShow] = useState("expenses")
    const [showFilters, setShowFilters] = useState(false)

    const { balance, total, expenses } = useMoney()

    const ShowReport = () => {
        if (show == "expenses") {
            return (
                <Report total={expenses} />
            )
        } else if (show == "incomes") {
            return (
                <Report total={total} />
            )
        } else {
            return (
                <Report total={balance} />
            )
        }
    }

    const MonthPicker = () => {

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
        <View style={styles.containter}>
            <Text style={styles.title}>Wallet</Text>
            <View style={styles.filters}>
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
                
            </View>
            <Filters />
            <ShowReport />
            <View style={styles.row}>
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={styles.textReturn}>Return</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#3C3C3C',
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
        margin: 2,
        marginTop: 80
    },
    filters: {
        backgroundColor: '#32779E',
        borderRadius: 3,
        marginTop: 5,
        paddingBottom: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
    },
    mainFilters: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        padding: 10,
        marginBottom: 5,
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
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
    secondaryContainer: {
        backgroundColor: '#32779E',
        borderBottomStartRadius: 3,
        borderBottomEndRadius: 3,
    },
    buttonContainer: {
        width: '23%',
        paddingHorizontal: 2,
        marginHorizontal: 2,
        backgroundColor: '#32779E',
        borderColor: '#CCC',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 50
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    row: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        alignSelf: 'center'
    },
    textReturn: {
        color: '#22EEFB'
    }
})

