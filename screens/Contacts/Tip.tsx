import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import Colors from 'constants/Colors';

import type { SharedValue } from 'react-native-reanimated';

type Props = {
  isVisible: SharedValue<boolean>;
};

export const Tip = ({ isVisible }: Props) => {
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isVisible.value ? 32 : 0, { duration: 500 }),
      opacity: withTiming(isVisible.value ? 1 : 0, { duration: 500 }),
    };
  });

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <Text style={styles.headerText}>Swipe up to access search.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerText: {
    color: Colors.light.secondary,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
