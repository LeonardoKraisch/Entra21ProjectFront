import { useState } from "react"
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { Button, TextInput } from "react-native-paper";
import useUser from "../data/hooks/useUser"
import useMoney from "../data/hooks/useMoney"

export default props => {
    const { sendRecoverEmail } = useUser()
    const { showToast } = useMoney()
    const [email, setEmail] = useState(props.route.params.email)
    const [password, setPassword] = useState()

    const sendEmail = async () => {
        console.log("here");
        showToast(await sendRecoverEmail(email))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recover Password</Text>
            <TextInput style={styles.inputs}
                label="Email"
                textContentType="emailAddress"
                onChangeText={setEmail}
                value={email}
            />
            <TouchableOpacity style={styles.button}
                onPress={sendEmail}>
                <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
            <View style={styles.recoverContainer}>
                <TextInput style={styles.inputs}
                    label="Type the verification code"
                    textContentType="oneTimeCode"
                    value={password}
                    onChangeText={setPassword}
                />
                <Button onPress={sendEmail}>
                    <Text>Recover</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353935',
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F5FEFD',
        margin: 2
    },
    inputs: {
        marginTop: 30,
        borderRadius: 5,
        width: '90%',
        height: 50,
        backgroundColor: '#F5FEFD',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#157de6',
        width: '90%',
        alignSelf: 'center',
        marginTop: 38,
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#F5FEFD',
        fontSize: 20
    },
    recoverContainer: {
        width: '70%',
        backgroundColor: '#F5FEFD',
        paddingBottom: 20,
        borderRadius: 20,
        marginTop: 60
    }
})