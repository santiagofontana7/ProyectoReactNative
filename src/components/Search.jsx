import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../utilities/colors";

const Search = ({ onSearch = () => { }, goBack = () => { }, category }) => {
  const [keyword, setKeyword] = useState("")

  const search = (value) => {
    setKeyword(value);
    onSearch(value);
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={goBack}>
          <Ionicons name="chevron-back-circle" size={24} color={colors.black} />
        </Pressable>
        <Text style={styles.text}>
          <Text >{"Estás viendo "}</Text>
          <Text style={{ fontWeight: "bold", fontStyle: "italic", textDecorationLine: "underline" }}>{category}</Text>
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Buscar..." value={keyword} onChangeText={value => search(value)} />
      </View>
    </>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingTop: 5,
    left:5
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'start',
    gap: 4,
    width: '90%',
  },
  input: {
    padding: 8,
    fontSize: 18,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    width: "85%"
  }
})
