import { Button, Pressable, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import Slider from "../components/Carousel/Slider"
import { colors } from "../utilities/colors"
import { Ionicons } from '@expo/vector-icons';
import { useGetProductByIdQuery } from "../services/shopService"
import Loader from "../components/Loaders"

const ItemDetail = ({ route, navigation }) => {

  const { productId: idSelected } = route.params

  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);

  return (
    <View style={isLoading ? [styles.container, styles.horizontal] : styles.mainContainer}>
      {!isLoading ? (
        <View>
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
      ) : <Loader text={"Cargando producto"} />}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    justifyContent: 'space-around',
  },
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
