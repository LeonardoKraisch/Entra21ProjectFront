import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { Gravatar } from "react-native-gravatar";
import { Ionicons } from "@expo/vector-icons";

export default props => {
    const [name, setName] = useState('Leonardo')
    const [email, setEmail] = useState('leonardokraisch@outlook.com')
    const [balance, setBalance] = useState('2.000,00')
    const [coin, setCoin] = useState('R$')
    const [showBalance, setShowBalance] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.userInfo}>
                    <Gravatar options={{ email, secure: true }}
                        style={styles.avatar} />
                    <View style={styles.texts}>
                        <Text style={{color: '#FFF', fontSize: 18}}>{"Welcome,"}</Text>
                        <Text style={{color: '#FFF', fontSize: 27}}>{name}</Text>
                    </View>
                </View>
                <View style={styles.balance}>
                    <View style={styles.textIcon}>
                        <Text style={{color: '#FFF', fontSize: 18}}>Balance:</Text>
                        <TouchableOpacity style={styles.eye} onPress={() => setShowBalance(!showBalance)}>
                            <Ionicons name={showBalance ? 'eye' : 'eye-off-outline'}
                                size={25} color='#FFF' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.value}>
                        <Text style={{color: '#FFF', fontSize: 27}}>{coin}</Text>
                        <View>{showBalance ? <Text style={{color: '#FFF', fontSize: 27}}>{balance}</Text> : <Text style={{color: '#FFF', fontSize: 27}}>{"--------"}</Text>}</View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#32779E',
        width: '100%',
        height: 180,
        justifyContent: 'flex-end',
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    userInfo: {
        flexDirection: 'row',
    },
    avatar: {
        margin: 5,
        height: 60,
        width: 60,
        borderRadius: 30
    },
    texts: {
        justifyContent: 'flex-end',
        margin: 2,
        padding: 0
        
    },
    balance: {
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
        width: '45%',
        justifyContent: 'flex-end',
        paddingHorizontal: 7
    },
    textIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    value: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    eye: {
        width: 25,
        height: 25,
    }


})