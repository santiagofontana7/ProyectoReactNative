import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../utilities/colors";

const Search = ({ onSearch = () => { }, goBack = () => { } }) => {
  const [keyword, setKeyword] = useState("")

  const search = (value) => {
    setKeyword(value);
    onSearch(value);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <Ionicons name="chevron-back-circle" size={24} color={colors.black} />
      </Pressable>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Buscar..." value={keyword} onChangeText={value => search(value)} />
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
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
})
