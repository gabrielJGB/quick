import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { Icon, TouchableRipple } from 'react-native-paper'
import { useSettings } from '../context/SettingsProvider'

const ColumnsButton = ({ twoColumns, setTwoColumns }) => {

    const { accentColor } = useSettings()

    return (

        <TouchableRipple
            rippleColor={accentColor}
            onPress={() => setTwoColumns(!twoColumns)}
        >
            <View stlye={s.container}>
                <Icon
                    color='white'
                    source={!twoColumns ? "microsoft" : "square"} size={23} />
            </View>
        </TouchableRipple>
    )
}

export default ColumnsButton

const s = StyleSheet.create({
    container: {
    }
})