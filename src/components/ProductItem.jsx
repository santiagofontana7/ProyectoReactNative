import { Image, StyleSheet, Text, Pressable, View } from "react-native"
import React from "react"
import Card from "./Card"
import { useDispatch } from "react-redux"
import { setIdSelected } from "../features/Shop/shopSlice"
import { colors } from "../utilities/colors"

const ProductItem = ({ product, index, setProductSelected = () => { }, navigation, }) => {

    const dispatch = useDispatch()
    const handleNavigate = () => {
        dispatch(setIdSelected(product.title))
        navigation.navigate('ItemDetail', { productId: product.id })
    }

    return (
        <Card style={index % 2 == 0 ? styles.cardOdd : styles.card}>
            <Pressable style={styles.pressable} onPress={handleNavigate}>
                <Image resizeMode="cover" style={styles.image} source={{ uri: product.thumbnail }} />
                <View>
                    <Text style={styles.textTitle}>{product.title}</Text>
                    <Text style={styles.textBrand}>{product.brand}</Text>
                    <Text style={styles.textPrice}>$ {product.price}</Text>
                </View>
            </Pressable>
        </Card>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: "25%",
    },
    cardOdd: {
        height: 120,
        width: "100%",
        margin: 10,
        backgroundColor: colors.softBlue,
    },
    card: {
        height: 120,
        width: "100%",
        margin: 10,
        backgroundColor: colors.softYellow,
    },
    textTitle: {
        width: "70%",
        fontSize: 18,
        marginLeft: 10,
        color: colors.black,
        fontWeight: 'bold'
    },
    textPrice: {
        fontSize: 16,
        marginLeft: 10,
    },
    textBrand: {
        marginLeft: 10,
        color: colors.gray,
        fontStyle: 'italic'
    },
    pressable: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
})
