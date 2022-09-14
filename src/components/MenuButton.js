import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default props => {

    return (
        <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name='menu' size={25} color='#FFF'/>
        </TouchableOpacity>
    )
}