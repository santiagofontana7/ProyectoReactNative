import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

//Componente para cada ítem (imagen) de carrousel
//Código extraido de: https://github.com/Basir-PD/React-Native-Carousel
//Tutorial: https://www.youtube.com/watch?v=2TgArwz6je8&t=148s&ab_channel=BasirPayenda
const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);
  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: item }}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.55,
    width: '80%',
  },
});
