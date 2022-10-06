import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native"
import Register from "../components/Wallet/Register";
import useMoney from "../data/hooks/useMoney"

export default props => {
    const {getAllRegistersToWallet } = useMoney() 
    const [launches, setLaunches] = useState()
    useEffect(()=>{
        async function loadRegisters(){
            setLaunches(await getAllRegistersToWallet(props.route.params.wallet.wuCode))
        }
        loadRegisters()
    },[])
    return(
        <View>
            <FlatList
                    numColumns={1}
                    width='97%'
                    data={launches}
                    renderItem={(wallet) =>
                        <Register {...wallet.item}/>
                        // console.log({wallet})
                    }/>
        </View>
    )
}