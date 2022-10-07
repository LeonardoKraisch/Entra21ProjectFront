import React, { useEffect, useState } from "react";
import { BackHandler, Alert, View, StyleSheet, FlatList, StatusBar, TouchableOpacity, Text } from 'react-native'
import Header from "../components/Header";
import MiniWallet from "../components/MiniWallet";
import MainWallet from "../components/Wallet/MainWallet";
import AddView from "../components/AddLaunch/AddView";
import useMoney from "../data/hooks/useMoney";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default props => {
    const { getWallets, getPendings } = useMoney()
    const [wallets, setWallets] = useState()

    useEffect(() => {
        async function loadWallets() {
            setWallets(await getWallets())
            getPendings()
        }
        loadWallets()
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [])

    const backAction = () => {
        Alert.alert("Do you want to leave the app?", "", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => BackHandler.exitApp()
            }
        ]);
        return true;
    };

    return (
        <LinearGradient colors={['#192b6a', '#243e9c', '#3155d6']} style={styles.container}>
            <Header {...props} />
            <View style={styles.body}>
                <View style={styles.mainContainer}>
                    <MainWallet {...props} />
                </View>
                <FlatList
                    numColumns={2}
                    width='97%'
                    data={wallets}
                    renderItem={(wallet) =>
                        <View><MiniWallet
                            wallet={wallet}
                            navigation={props.navigation}
                        />

                            <TouchableOpacity onPress={() => props.navigation.navigate("ShareWallet", { wallet })}
                                style={styles.shareButton}
                            >
                                <FontAwesome5 name="plus" size={25} color="#FFF" />
                                <Text style={styles.newButtonText}>Share Wallet</Text>
                            </TouchableOpacity>

                        </View>
                    }
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("CreateWallet")} style={styles.newButton}>
                        <FontAwesome5 name="plus" size={25} color="#FFF" />
                        <Text style={styles.newButtonText}>Create Wallet</Text>
                    </TouchableOpacity>
                </View>

                <AddView />
            </View>
            <StatusBar backgroundColor={'#192b6a'} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    body: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    mainContainer: {
        margin: 10,
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        justifyContent: 'flex-start',
        maxHeight: '16%',
        width: '93%',
        borderTopColor: '#FFF',
        borderTopWidth: 1,
        paddingTop: 10

    },
    newButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '40%',
        height: '73%',
        padding: 10,
        borderRadius: 5,
        flexWrap: 'wrap',
        backgroundColor: '#353935',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    newButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 4,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '92%',
        height: '50%',
        padding: 10,
        left: 10,
        borderRadius: 5,
        flexWrap: 'wrap',
        backgroundColor: '#32779E',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    }
})