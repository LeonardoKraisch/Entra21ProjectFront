import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register"

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default props => {

    const [email, setEmail] = useState('')

    const Auth = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )

    const AuthOrHome = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
           {email ? 
                <Stack.Screen name="Home" component={Home} /> 
                    :
                <Stack.Screen name="Auth" component={Auth} />
           } 
        </Stack.Navigator>
    )

    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#32779E'
                },
                drawerItemStyle: {
                    height: 60,
                    backgroundColor: '#34669E',
                },

            }} initialRouteName="AuthOrHome" >
                <Drawer.Screen
                    name="AuthOrHome"
                    component={AuthOrHome} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

