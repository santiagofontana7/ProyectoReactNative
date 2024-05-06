import { FlatList, StyleSheet, Text, View } from "react-native"
import ProductItem from "../components/ProductItem"
import Search from "../components/Search"
import { useState, useEffect } from "react"
import { useGetProductsByCategoryQuery } from "../services/shopService"
import Loader from "../components/Loaders"

const ItemListCategory = ({
  setCategorySelected = () => { },
  navigation,
  route
}) => {

  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const { categoryName: categorySelected } = route.params

  const { data: products, error, isLoading } = useGetProductsByCategoryQuery(categorySelected);

  useEffect(() => {
    if (!isLoading) {
      const productsFilter = products.filter((product) =>
        product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
      )
      setProductsFiltered(productsFilter)
    }

  }, [keyWord, categorySelected, products, isLoading])

  return (
    <View style={isLoading ? [styles.container, styles.horizontal] : styles.flatListContainer}>
      {
        isLoading ?
          <Loader text={"Cargando productos"} /> :
          <View>
            <Search onSearch={setKeyword} goBack={() => navigation.goBack()} category={categorySelected} />
            <FlatList showsVerticalScrollIndicator={false} data={productsFiltered} renderItem={({ item, index }) => (
              <ProductItem product={item} index={index} navigation={navigation} />
            )}
              keyExtractor={(producto) => producto.id}
            />
          </View>
      }
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    justifyContent: 'space-around',
  },
  flatListContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15
  },
})
