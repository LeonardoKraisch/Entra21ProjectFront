import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default props => {

    return (
        <TouchableOpacity style={{ marginHorizontal: 5, height: 36, width: 36 }} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name='menu' size={35} color='#FFF' />
        </TouchableOpacity>
    )
}