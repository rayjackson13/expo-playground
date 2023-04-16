import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type RouteParams = ParamListBase & {
  uri: string;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = SCREEN_HEIGHT / 4;

export default function PhotoPreviewScreen({ route, navigation }: StackScreenProps<RouteParams>) {
  const { uri } = route.params as RouteParams;
  const position = useSharedValue(0);
  const opacity = useDerivedValue(() => {
    const value = Math.abs(position.value) / SWIPE_THRESHOLD;
    
    return value > 1 ? 0 : 1 - value;
  })

  console.log(position.value);

  const gesture = Gesture.Pan()
    .onUpdate(({ translationY }) => {
      'worklet';

      console.log('update', translationY);

      position.value = translationY;
    })
    .onEnd(({ translationY }) => {
      'worklet';

      if (Math.abs(translationY) > SWIPE_THRESHOLD) {
        runOnJS(navigation.goBack)();
        return;
      }

      position.value = 0;
    });

  const modalStyle = useAnimatedStyle(() => {
    'worklet';

    return {
      opacity: opacity.value,
      transform: [{ translateY: withSpring(position.value, { damping: 50, stiffness: 1000 }) }]
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    'worklet';

    return {
      backgroundColor: 'black',
      opacity: opacity.value,
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.flex, styles.root]}>
        <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]} />

        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            modalStyle,
          ]}
        >
          <Image source={{ uri }} style={styles.image} resizeMode='contain' />
        </Animated.View>
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  }
})