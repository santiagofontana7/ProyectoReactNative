import { Image, Pressable, StyleSheet, Text } from "react-native"
import React from "react"
import Card from "./Card"
import { useDispatch } from 'react-redux'
import { setCategorySelected } from "../features/Shop/shopSlice"

const CategoryItem = ({ category, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    const categoryName = category.name;
    dispatch(setCategorySelected(categoryName))
    navigation.navigate('ItemListCategory', { categoryName })
  }

  return (
    <Card style={{ marginVertical: 10, marginHorizontal: 10 }}>
      <Pressable onPress={handleNavigate}>
        <Image resizeMode="cover" style={styles.image} source={{ uri: category.img, }} />
        <Text style={styles.text}>{category.name.toUpperCase()}</Text>
      </Pressable>
    </Card>

  )
}

export default CategoryItem

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 14,
    color: "white"
  },
  image: {
    height: "88%",
  }
})
