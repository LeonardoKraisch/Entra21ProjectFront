import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextMask } from "react-native-masked-text";
import { MaterialIcons } from '@expo/vector-icons'

export default props => {
    const [show, setShow] = useState(false)

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    const ShowDescription = () => {
        if (show) {
            return (
                <View style={styles.descriptionContainer}>
                    <MaterialIcons name="subdirectory-arrow-right" size={15} color='#000' />
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Description: </Text>
                    <Text style={styles.description}>{props.incDescription ? props.incDescription : props.expDescription}</Text>
                </View>
            )
        }
    }

    return (
        <Swipeable renderRightActions={getRightContent} >
            <TouchableOpacity onPress={() => setShow(!show)} style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.incCategory ? props.incCategory : props.expCategory}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.incDate ? props.incDate : props.expDate}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.parcelCode}</Text>
                </View>
                <View style={styles.textContainer}>
                    <TextMask type={'money'}
                        value={props.incMoney ? props.incMoney : props.expMoney}
                        options={{
                            precision: 2,
                            separator: ',',
                            unit: props.expMoney < 0 ? '-' : '',
                            delimiter: '.',
                            suffixUnit: ''
                        }} style={styles.text} />
                </View>
            </TouchableOpacity>
            <ShowDescription />
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 40,
        borderRightColor: '#9997',
        borderBottomColor: '#9997',
        borderBottomWidth: 2,
        borderRightWidth: 2,
        alignItems: 'center',
        marginTop: 5
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 5,
        height: 40
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        justifyContent: 'space-between'
    },
    text: {
        fontWeight: 'bold'
    },
    descriptionContainer: {
        backgroundColor: '#EEE',
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'baseline'
    },
    description: {
        flex: 1,
        marginLeft: 10
    }
})