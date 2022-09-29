import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent} >
            <View style={styles.container}>
                <Text>{props.incMoney}</Text>
                <Text>{props.incDate}</Text>
                <Text>{props.incCategory}</Text>
                <Text>{props.incDescription}</Text>
                <Text>{props.parcelCode}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    }
})