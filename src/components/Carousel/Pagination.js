import { StyleSheet, Animated, View, Dimensions } from 'react-native';
import React from 'react';
import { colors } from '../../utilities/colors';

const { width } = Dimensions.get('screen');

//Componente para paginación de imágenes en carrusel
//Código extraido de: https://github.com/Basir-PD/React-Native-Carousel
//Tutorial: https://www.youtube.com/watch?v=2TgArwz6je8&t=148s&ab_channel=BasirPayenda
const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [colors.softBlue, colors.black, colors.softBlue],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 440,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: 'red',
  },
});
