import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default props => {

    return (
        <TouchableOpacity style={{marginHorizontal: 10, height: 40, width: 40, alignSelf: 'flex-start'}} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name='menu' size={40} color='#FFF'/>
        </TouchableOpacity>
    )
}