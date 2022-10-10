import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import useUser from "../data/hooks/useUser"
import useMoney from "../data/hooks/useMoney"

export default props => {
    const { sendRecoverEmail } = useUser()
    const { showToast } = useMoney()
    const [email, setEmail] = useState(props.route.params.email)
    const [password, setPassword] = useState()

    const sendEmail = async () =>{
        console.log("here");
        showToast(await sendRecoverEmail(email)) 
    }

    return (
        <View>
            <TextInput
                onChange={setEmail}
                value={email}
            />
            <TouchableOpacity
                onPress={sendEmail}
            >
                <Text>Recover password</Text>
            </TouchableOpacity>


            <TextInput
                placeholder="Type the code send to your email"
                onChange={setPassword}
            />
        </View>
    )
}