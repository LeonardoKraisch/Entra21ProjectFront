import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from 'react-native'
import useUser from "./data/hooks/useUser";
import useMoney from "./data/hooks/useMoney";


export default props => {
    const { start, email } = useUser()
    const { fetchAllLaunches } = useMoney()

    useEffect(() => {
        start()
        async function fetch() {
            if (email) {
                fetchAllLaunches()
                setTimeout(() => {
                    props.navigation.navigate("Main")
                }, 3000)
            } else {
                setTimeout(() => props.navigation.navigate("Auth"), 3000)
            }
        }
        fetch()
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require("../assets/abelha.jpg")}
                style={styles.image} />
            <Text style={styles.text}>Your Beezness</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 300,
        width: 300,
        resizeMode: "contain"
    },
    text: {
        fontSize: 50,
        color: "#333",
        fontWeight: 'bold'
    }
})


