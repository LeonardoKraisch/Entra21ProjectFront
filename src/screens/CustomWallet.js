import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native"
import Register from "../components/Wallet/Register";
import useMoney from "../data/hooks/useMoney";

export default props => {
    const {getAllRegistersToWallet } = useMoney() 
    const [launches, setLaunches] = useState()
    useEffect(()=>{
        async function loadRegisters(){
            console.log(props.route.params);
            await setLaunches(await getAllRegistersToWallet(1))
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
                        <Register {...walletCode.wallet.item}/>
                        // console.log(wallet.item)
                    }/>
        </View>
    )
}