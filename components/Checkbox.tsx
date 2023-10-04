import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { AnimatedTouchable } from './AnimatedTouchable';

type Props = {
  index: number;
  isSelected: boolean;
  onPress: (index: number) => unknown;
  title: string;
};

const Checkbox = React.memo(({ index, isSelected, onPress, title }: Props) => {
  const handlePress = () => onPress(index);

  const toggleStyle = useAnimatedStyle(() => {
    'worklet';

    return {
      backgroundColor: withTiming(isSelected ? '#34C759' : 'gray', {
        duration: 150,
      }),
    };
  });

  const tumblerStyle = useAnimatedStyle(() => {
    'worklet';

    return {
      transform: [{ translateX: withTiming(isSelected ? 16 : 0, { duration: 150 }) }],
    };
  });

  return (
    <AnimatedTouchable onPress={handlePress} style={styles.root}>
      <Text>{title}</Text>

      <Animated.View style={[styles.toggle, toggleStyle]}>
        <Animated.View style={[styles.tumbler, tumblerStyle]} />
      </Animated.View>
    </AnimatedTouchable>
  );
});

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  toggle: {
    backgroundColor: 'gray',
    borderRadius: 64,
    height: 28,
    padding: 2,
    width: 44,
  },
  tumbler: {
    backgroundColor: 'white',
    borderRadius: 24,
    height: 24,
    left: 2,
    position: 'absolute',
    top: 2,
    width: 24,
  },
});

export default Checkbox;
