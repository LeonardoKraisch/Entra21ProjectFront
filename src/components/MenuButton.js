import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default props => {

    return (
        <TouchableOpacity style={{ marginLeft: 3, paddingTop: 2, height: 35, width: 35 }} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name='menu' size={35} color='#FFF' />
        </TouchableOpacity>
    )
}