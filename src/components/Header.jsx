import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import { colors } from '../utilities/colors'

const Header = ({ route }) => {

  const { width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
                <Image
                    source={require("../images/logo.png")}
                    style={styles.image}
                />
            </View>
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
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  imageContainer: {
    width: "100%",
    height: "65%"
  },
})