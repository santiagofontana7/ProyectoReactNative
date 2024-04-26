import { Button, Pressable, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import allProducts from "../data/products.json"
import Slider from "../components/Carousel/Slider"
import { colors } from "../utilities/colors"
import { Ionicons } from '@expo/vector-icons';

const ItemDetail = ({ route, navigation }) => {

  const [product, setProduct] = useState(null)
  const { productId: idSelected } = route.params

  useEffect(() => {
    const productSelected = allProducts.find(
      (product) => product.id === idSelected
    )
    setProduct(productSelected)
  }, [idSelected])

  return (
    <View>
      {product ? (
        <View style={styles.mainContainer}>
          <Slider Images={product.images} />
          <View style={styles.textContainer}>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-circle" size={24} color={colors.black} />
              </Pressable>
              <Text style={styles.textBrand}>Volver</Text>
            </View>
            <Text style={styles.textTitle}>{product.title}</Text>
            <Text style={styles.textBrand}>{product.brand}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.textTitle}>${product.price}</Text>
            <Button color={colors.warning} title="Añadir al carrito"></Button>
          </View>
          <View>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
  },
  textContainer: {
    position: "relative",
    padding: 10,
    flexDirection: "column",
    bottom: 440
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textBrand: {
    color: colors.gray,
    fontStyle: 'italic'
  },
  button: {
    padding: 50
  }
})
