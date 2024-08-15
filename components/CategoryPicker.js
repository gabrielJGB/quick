import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { fetchCategories } from '../utils/fetch'
import { useStateContext } from '../context/StateProvider'
import { ActivityIndicator } from 'react-native-paper'

const CategoryPicker = () => {

    const { selectedCategory, setSelectedCategory } = useStateContext()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)



    useEffect(() => {

        fetchCategories()
            .then(resp => setCategories(resp))
            .finally(() => setLoading(false))

    }, [selectedCategory])

    if (loading)
        return <ActivityIndicator size={16} color="white" style={{ marginTop: 40, width: "100%" }} />

    return (
        <View style={s.container}>
            <Picker
                style={s.picker}
                itemStyle={{ color: "white", backgroundColor: "black",borderRadius:10 }}

                selectedValue={selectedCategory}
                mode='dropdown'
                selectionColor="white"
                dropdownIconColor="white"
                prompt={`Seleccionar Categoria`}
                onValueChange={(itemValue, itemIndex) => { setSelectedCategory(itemValue) }}

            >

                <Picker.Item style={s.item} color='white' label="Todas las categorías" value={"aaa"} />

                {
                    categories.map((category, i) => (
                        <Picker.Item
                            key={i}
                            color='white'
                            style={s.item}
                            label={`${category.name}`}
                            value={category.slug} />
                    ))
                }

                {/* {
                    Array.from({ length: (new Date().getFullYear() + 1) - 2000 }, (_, index) => new Date().getFullYear() - index).map((a, i) => (
                        <Picker.Item key={i} color='black' label={`${a}/${String(a + 1).slice(2)}`} value={a} />


                    ))
                } */}

            </Picker>
        </View>

    )
}

export default CategoryPicker

const s = StyleSheet.create({
    container: {
        borderRadius:10,
        width: "80%",
        marginBottom:10,
    },
    picker: {
        borderRadius:10,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "white"
    },
    item: {
        fontSize:13,
        backgroundColor: "black",

    }
})