import { FlatList, StyleSheet, Text, View } from "react-native"
import products from "../data/products.json"
import ProductItem from "../components/ProductItem"
import Search from "../components/Search"
import { useState, useEffect } from "react"

const ItemListCategory = ({
  setCategorySelected = () => { },
  navigation,
  route
}) => {

  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const { categoryName: categorySelected } = route.params

  useEffect(() => {
    const productsPrefiltered = products.filter(
      (product) => product.category === categorySelected
    )

    const productsFilter = productsPrefiltered.filter((product) =>
      product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
    )
    setProductsFiltered(productsFilter)

  }, [keyWord, categorySelected])

  return (
    <View style={styles.flatListContainer}>
      <Search onSearch={setKeyword} goBack={() => navigation.goBack()} />
      <FlatList showsVerticalScrollIndicator={false} data={productsFiltered} renderItem={({ item, index }) => (
        <ProductItem product={item} index={index} navigation={navigation} />
      )}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 5
  },
})
