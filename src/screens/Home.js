import React, { useEffect, useState } from "react";
import { BackHandler, Modal, Alert, View, StyleSheet, FlatList, StatusBar, TouchableOpacity, Text } from 'react-native'
import { Card, SegmentedButtons } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import Header from "../components/Header";
import MiniWallet from "../components/MiniWallet";
import MainWallet from "../components/Wallet/MainWallet";
import AddView from "../components/AddLaunch/AddView";
import useMoney from "../data/hooks/useMoney";
import CreateWallet from "../components/CreateWallet";

import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import JoinWallet from "../components/JoinWallet";

export default props => {
    const { getWallets, getPendings } = useMoney()
    const [wallets, setWallets] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showHelp, setShowHelp] = useState(false)

    const [solo, setSolo] = useState(true)
    const [myState, refresh] = useState(true)

    useEffect(() => {
        async function loadWallets() {
            setWallets(await getWallets())
            getPendings()
        }
        loadWallets()
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [myState])

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
                        <MiniWallet
                            wallets={wallets}
                            wallet={wallet}
                            navigation={props.navigation}
                        />
                    }
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setShowModal(true)} style={styles.newButton}>
                        <FontAwesome5 name="plus" size={25} color="#FFF" />
                        <Text style={styles.newButtonText}>New Wallet</Text>
                    </TouchableOpacity>
                </View>
                <Modal visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowModal(false)}>
                    <View style={styles.modalView}>
                        <Card style={styles.modalCard}>
                            <View style={styles.buttonHelpContainer}>
                                <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.buttonHelp}>
                                    <Text style={styles.buttonHelpText}>?</Text>
                                </TouchableOpacity>
                            </View>
                            <SegmentedButtons style={styles.group} value={solo}
                                onValueChange={setSolo}
                                buttons={[
                                    {
                                        value: true,
                                        label: 'Create Wallet',
                                        icon: 'archive-plus-outline',
                                        style: styles.segmentedButton
                                    },
                                    {
                                        value: false,
                                        label: 'Join Wallet',
                                        icon: 'archive-search-outline',
                                        style: styles.segmentedButton
                                    },
                                ]} />
                            <Card.Content style={styles.content}>
                                {
                                    solo ?
                                        <CreateWallet refresh={() => refresh(!myState)} pressProps={() => setShowModal(false)} />
                                        :
                                        <JoinWallet refresh={() => refresh(!myState)} pressProps={() => setShowModal(false)} />

                                }
                            </Card.Content>
                        </Card>
                    </View>
                    <Modal visible={showHelp}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setShowHelp(false)}>
                        <View style={styles.modalHelp}>
                            <Card style={styles.textHelpModal}>
                                <Text style={styles.textModal}>This is the Custom Wallet session!</Text>
                                <Text style={styles.textModal}>Here you can choose to track specific type of launches and even invite other people to participate.</Text>
                                <Text style={styles.textModal}>For example, if you want to keep a part of your incomes separate to save up;</Text>
                                <Text style={styles.textModal}>Or if you live with other people and have to split the bills.</Text>
                                <Text style={styles.textModal}>You can share this wallet with whoever you want, and every member can launch and track expenses.</Text>
                                <TouchableOpacity onPress={() => setShowHelp(false)} style={styles.okModalButton}>
                                    <MaterialIcons size={35} name="done" color="green" />
                                </TouchableOpacity>
                            </Card>
                        </View>
                    </Modal>
                </Modal>
                <AddView wallets={wallets} />
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
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        height: 55,
        width: '100%',

    },
    newButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: 187,
        height: 46,
        padding: 10,
        borderTopEndRadius: 15,
        flexWrap: 'wrap',
        backgroundColor: '#353935',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    newButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        letterSpacing: 1.5
    },
    modalView: {
        padding: 10,
        minHeight: '100%'
    },
    modalCard: {
        flex: 1,
        width: '100%',
    },
    buttonHelpContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonHelp: {
        height: 25,
        width: 25,
        backgroundColor: '#353935',
        margin: 10,
        marginLeft: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        elevation: 3
    },
    buttonHelpText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF'
    },
    group: {
        width: '95%',
        alignSelf: 'center'
    },
    segmentedButton: {
        width: '50%',
    },
    modalHelp: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHelpModal: {
        width: '90%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    textModal: {
        padding: 5,
        fontSize: 17,
        fontWeight: "500"
    },
    okModalButton: {
        marginTop: 12,
        marginRight: 12,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    content: {
        height: '100%',
        paddingTop: 20,
    }
})