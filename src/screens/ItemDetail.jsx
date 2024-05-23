import { Pressable, TouchableOpacity, StyleSheet, Text, View } from "react-native"
import React from "react"
import Slider from "../components/Carousel/Slider"
import { colors } from "../utilities/colors"
import { Ionicons } from '@expo/vector-icons';
import { useGetProductByIdQuery } from "../services/shopService"
import Loader from "../components/Loaders"
import { useDispatch } from "react-redux"
import { addCartItem } from "../features/Cart/cartSlice"
import { useToast } from "react-native-toast-notifications";

const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch()
  const { productId: idSelected } = route.params
  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);

  const toast = useToast();

  const handleAddCart = () => {
    dispatch(addCartItem({ ...product, quantity: 1 }))
    toast.show("Producto agregado al carrito", {
      type: "success",
      placement: "center",
      duration: 1500,
      offset: 300,
      animationType: "zoom-in",
    });
  }

  return (
    <View style={isLoading ? [styles.container, styles.horizontal] : styles.mainContainer}>
      {!isLoading ? (
        <View>
          <View style={styles.containerBack}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={24} color={colors.black} />
            </Pressable>
          </View>
          <Slider Images={product.images} />
          <View style={styles.textContainer}>

            <Text style={styles.textTitle}>{product.title}</Text>
            <Text style={styles.textBrand}>{product.brand}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.textTitle}>${product.price}</Text>
            <TouchableOpacity style={styles.button} onPress={handleAddCart}>
              <Text>AÑADIR AL CARRITO</Text>
            </TouchableOpacity >
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
  containerBack: {
    zIndex: 99,
    marginTop: 10,
    top: 105,
    left: 10
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
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.warning
  }
})
