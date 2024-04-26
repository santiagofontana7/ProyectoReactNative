import { FlatList, StyleSheet, Text, View } from "react-native"
import CategoryItem from "../components/CategoryItem"
import categories from "../data/categories.json"

const Home = ({ route, navigation }) => {
  return (
    <View style={styles.flatListContainer}>
      <Text style={styles.text}>Categorías disponibles</Text>
      <FlatList
        key={'v'}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        data={categories.sort()}
        renderItem={({ item }) => (
          <CategoryItem navigation={navigation} category={item} />
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
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
