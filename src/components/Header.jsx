import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../utilities/colors'
import { useSelector } from 'react-redux'

const Header = ({ route }) => {

  const { width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <Text style={width > 360 ? styles.text : styles.textSmall}>{route.name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: colors.warning,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSmall: {
    fontSize: 16
  },
  text: {
    fontSize: 22
  }
})