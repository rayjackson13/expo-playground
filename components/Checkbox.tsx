import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import AnimatedTouchable from './AnimatedTouchable'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
  index: number;
  isSelected: boolean;
  onPress: (index: number) => unknown;
  title: string;
};

const Checkbox = React.memo(({ index, isSelected, onPress, title }: Props) => {
  console.info('checkbox render');

  const handlePress = () => onPress(index);

  const toggleStyle = useAnimatedStyle(() => {
    'worklet';

    return {
      backgroundColor: withTiming(isSelected ? '#34C759' : 'gray', { duration: 150 }),
    }
  });

  const tumblerStyle = useAnimatedStyle(() => {
    'worklet';

    return {
      transform: [{ translateX: withTiming(isSelected ? 16 : 0, { duration: 150 }) }],
    }
  })

  return (
    <AnimatedTouchable onPress={handlePress} style={styles.root}>
      <Text>{title}</Text>

      <Animated.View style={[styles.toggle, toggleStyle]}>
        <Animated.View style={[styles.tumbler, tumblerStyle]} />
      </Animated.View>
    </AnimatedTouchable>
  )
})

const styles = StyleSheet.create({
  root: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  toggle: {
    width: 44,
    height: 28,
    backgroundColor: 'gray',
    borderRadius: 64,
    padding: 2,
  },
  tumbler: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 24,
  },
})

export default Checkbox