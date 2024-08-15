import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'

const ColumnsButton = ({ twoColumns, setTwoColumns }) => {



    return (

        <TouchableNativeFeedback onPress={()=>setTwoColumns(!twoColumns)}>
            <View stlye={s.container}>
                <Icon color='white' source={twoColumns ? "microsoft" : "square"} size={23} />
            </View>
        </TouchableNativeFeedback>
    )
}

export default ColumnsButton

const s = StyleSheet.create({
    container: {
    }
})