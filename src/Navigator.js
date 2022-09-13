import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./screens/Home";

const Drawer = createDrawerNavigator()

export default props => {

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen 
                    name="Home"
                    component={Home}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
