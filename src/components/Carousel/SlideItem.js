import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

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
