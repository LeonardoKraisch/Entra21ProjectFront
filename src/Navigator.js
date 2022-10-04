import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./Splash"
import Home from "./screens/Home";
import Wallet from './screens/Wallet'
import Login from "./screens/Login";
import Register from "./screens/Register"
import Debts from "./screens/Debts";

import useUser from "./data/hooks/useUser";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default props => {

    const { name, logout } = useUser()

    const Auth = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        )
    }

    const HomeStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Main" component={Home} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="My Debts" component={Debts} />
            </Stack.Navigator>
        )
    }


    const menuConfig = {
        headerShown: false,
        drawerStyle: {
            backgroundColor: '#32779E'
        },
        drawerItemStyle: {
            height: 60,
            backgroundColor: '#34669E',
        },
    }

    return (
        <NavigationContainer initialRouteName="Splash">
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
                                label="My Debts"
                                onPress={() => {
                                    props.navigation.navigate('My Debts')
                                }}
                            />
                            <DrawerItem
                                label="Logout"
                                onPress={() => {
                                    logout()
                                    props.navigation.closeDrawer()
                                }}
                            />
                        </DrawerContentScrollView>
                    )
                }
                }
                screenOptions={menuConfig}>
                <Drawer.Screen
                    name="Home"
                    component={HomeStack} />
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
})
