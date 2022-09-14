import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./screens/Home";
import Login from "./screens/Login";

const Drawer = createDrawerNavigator()

export default props => {

    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                headerShown:false,
                drawerStyle: {
                    backgroundColor: '#32779E'
                },
                drawerItemStyle :{
                    height: 60,
                    backgroundColor: '#34669E',
                },

            }} initialRouteName="Home" >
                <Drawer.Screen 
                    name="Home"
                    component={Home}/>
                <Drawer.Screen 
                    name="Login"
                    component={Login}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
