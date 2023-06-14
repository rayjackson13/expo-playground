import { Pressable as PressableBase, PressableProps, StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Pressable = Animated.createAnimatedComponent(PressableBase);

export default function AnimatedTouchable({style, ...props}: PressableProps) {
  const isTouched = useSharedValue(false);

  const onPressIn = (): void => {
    isTouched.value = true;
  }

  const onPressOut = (): void => {
    isTouched.value = false;
  }

  const rootStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isTouched.value ? .5 : 1, { duration: 125 }),
    };
  });

  return (
    <Pressable {...{onPressIn, onPressOut}} style={[rootStyle, style]} {...props} />
  )
}

const styles = StyleSheet.create({})