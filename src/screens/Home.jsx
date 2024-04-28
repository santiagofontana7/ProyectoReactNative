import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import CategoryItem from "../components/CategoryItem"
import { useGetCategoriesQuery } from "../services/shopService"
import Loader from "../components/Loaders";


const Home = ({ route, navigation }) => {

  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  return (

    <View style={isLoading ? [styles.container, styles.horizontal] : null}>
      {
        isLoading ?
          <Loader text={"Cargando categorías"} /> :
          (<View style={styles.flatListContainer}>
            <Text style={styles.text}>Categorías disponibles</Text>
            <FlatList
              key={'v'}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.name}
              data={categories}
              renderItem={({ item }) => (
                <CategoryItem navigation={navigation} category={item} />
              )}
            />
          </View>)
      }
    </View>

  )
}

export default Home

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 15
  },
  text: {
    fontSize: 18
  }
})
