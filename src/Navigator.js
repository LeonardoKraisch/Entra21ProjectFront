import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Wallet from './screens/Wallet'
import Login from "./screens/Login";
import Register from "./screens/Register"

import useUser from "./data/hooks/useUser";
import useMoney from "./data/hooks/useMoney";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default props => {

    const { email, name, logout } = useUser()
    const { getBalance } = useMoney()

    const Auth = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )

    const AuthOrHome = () => {
        getBalance()
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {email ?
                    <Stack.Screen name="Main" component={HomeStack} />
                    :
                    <Stack.Screen name="Auth" component={Auth} />
                }
            </Stack.Navigator>
        )
    }

    const HomeStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="First" component={Home} />
                <Stack.Screen name="Wallet" component={Wallet} />
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
        <NavigationContainer>
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
                screenOptions={menuConfig} initialRouteName="AuthOrHome" >
                <Drawer.Screen
                    name="Home"
                    component={AuthOrHome} />
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
