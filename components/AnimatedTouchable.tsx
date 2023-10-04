import React from 'react';
import { Pressable as PressableBase } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { PressableProps } from 'react-native';

const Pressable = Animated.createAnimatedComponent(PressableBase);

export const AnimatedTouchable = ({ style, ...props }: PressableProps) => {
  const isTouched = useSharedValue(false);

  const onPressIn = (): void => {
    isTouched.value = true;
  };

  const onPressOut = (): void => {
    isTouched.value = false;
  };

  const rootStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isTouched.value ? 0.5 : 1, { duration: 125 }),
    };
  });

  return <Pressable {...{ onPressIn, onPressOut }} style={[rootStyle, style]} {...props} />;
};
