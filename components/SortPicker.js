import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'

const SortPicker = ({ time, setTime }) => {
    
    useEffect(() => {
        setTime("day")

    }, [])

    return (
        <View style={s.container}>
            <View></View>
            <Picker
                style={s.picker}
                itemStyle={{ color: "white", backgroundColor: "black", borderRadius: 10 }}

                selectedValue={time}
                mode='dropdown'
                selectionColor="white"
                dropdownIconColor="white"
                prompt={`Seleccionar Categoria`}
                onValueChange={(itemValue, itemIndex) => { setTime(itemValue) }}

            >

                <Picker.Item style={s.item} color='white' label="Último día" value={"day"} />
                <Picker.Item style={s.item} color='white' label="Última semana" value={"week"} />
                <Picker.Item style={s.item} color='white' label="Último mes" value={"month"} />
                <Picker.Item style={s.item} color='white' label="Toda la eternidad" value={"all"} />






            </Picker>
        </View>
    )
}

export default SortPicker

const s = StyleSheet.create({
    container: {

        
        borderRadius: 10,
        marginBottom: 10,
    },
    picker: {
        borderRadius: 10,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "white"
    },
    item: {
        fontSize: 13,
        backgroundColor: "black",

    }
})