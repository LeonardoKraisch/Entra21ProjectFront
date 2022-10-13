import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import Splash from "./Splash"
import Home from "./screens/Home";
import Wallet from './screens/Wallet'
import CustomWallet from './screens/CustomWallet'
import Login from "./screens/Login";
import Register from "./screens/Register"
import Debts from "./screens/Debts";
import ShareWallet from "./screens/ShareWallet";
import WalletInvites from "./screens/WalletInvites";
import Recover from "./screens/Recover";
import MySavings from "./screens/MySavings";

import useUser from "./data/hooks/useUser";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default props => {

    const { name, logout } = useUser()

    const LogoutButton = props => {
        return (
            <TouchableOpacity onPress={() => {
                logout()
                props.navigation.closeDrawer()
            }} style={styles.logoutButton}>
                <MaterialIcons size={25} name="logout" color="red" />
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        )
    }

    const Auth = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        )
    }

    const HomeStack = props => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Main" {...props} component={Home} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="CustomWallet" component={CustomWallet} />
                <Stack.Screen name="ShareWallet" component={ShareWallet} />
                <Stack.Screen name="WalletInvites" component={WalletInvites} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Recover" component={Recover} />
            </Stack.Navigator>
        )
    }


    const menuConfig = {
        headerShown: false,
        drawerStyle: {
            backgroundColor: '#192b6a'
        },
        drawerItemStyle: {
            height: 46,
            backgroundColor: '#243e9c',
        },
        drawerLabelStyle: {
            color: '#FFF'
        }

    }
    return (
        <NavigationContainer
            initialRouteName="Splash"
            linking={props.linking}
        >
            <Drawer.Navigator
                drawerContent={props => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <View style={styles.userInfo}>
                                <View style={styles.texts}>
                                    <Text style={{ color: '#FFF', fontSize: 18 }}>{"Welcome,"}</Text>
                                    <Text style={{ color: '#FFF', fontSize: 27 }}>{name}</Text>
                                </View>
                            </View>
                            <DrawerItemList {...props} />
                            <DrawerItem
                                icon={() => <LogoutButton {...props} />}
                                label=''
                            />
                        </DrawerContentScrollView>
                    )
                }}
                screenOptions={menuConfig}>
                <Drawer.Screen
                    name="Home" {...props}
                    component={HomeStack} />
                <Drawer.Screen
                    name="My Debts"
                    component={Debts} />
                <Drawer.Screen
                    name="My Savings"
                    component={MySavings} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row',
        marginVertical: 20
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
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    logoutButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 20
    },

})
