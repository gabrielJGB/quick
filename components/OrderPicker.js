import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { useStateContext } from '../context/StateProvider'

const OrderPicker = () => {

    const { selectedOrder, setSelectedOrder } = useStateContext()

    return (
        <View style={s.container}>
            <Picker
                style={s.picker}
                itemStyle={{ color: "white", backgroundColor: "black", borderRadius: 10 }}

                selectedValue={selectedOrder}
                mode='dropdown'
                selectionColor="white"
                dropdownIconColor="white"
                prompt={`Seleccionar Categoria`}
                onValueChange={(itemValue, itemIndex) => { setSelectedOrder(itemValue) }}

            >

                <Picker.Item style={s.item} color='white' label="Recomendado" value={"featured"} />
                <Picker.Item style={s.item} color='white' label="Espectadores (Mayor a menor)" value={"desc"} />
                <Picker.Item style={s.item} color='white' label="Espectadores (Menor a mayor)" value={"asc"} />

            </Picker>
        </View>
    )
}

export default OrderPicker

const s = StyleSheet.create({
    container: {
        width:"50%",
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