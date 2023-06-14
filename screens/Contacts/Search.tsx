import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput as TextInputBase } from 'react-native-gesture-handler'
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Constants } from './constants'

type Props = {
  offset: SharedValue<number>;
  onChange: (value: string) => unknown;
  value: string;
}

const TextInput = Animated.createAnimatedComponent(TextInputBase);

export default function ContactSearch({ offset, onChange, value }: Props) {
  const wrapStyles = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value, [56, 0], [0, 1]);
    const height = interpolate(
      offset.value,
      [0, Constants.SearchHeight],
      [Constants.InputHeight, 0],
      Extrapolate.CLAMP
    );

    return ({ opacity, height })
  });

  return (
    <Animated.View style={[styles.wrap, wrapStyles]}>
      <MaterialCommunityIcons name="magnify" size={16} color={Colors.light.secondary} />
      <TextInput
        placeholder='Search'
        style={styles.text}
        placeholderTextColor={Colors.light.secondary}
        value={value}
        onChangeText={onChange}
        returnKeyType="search"
        numberOfLines={1}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.background,
    justifyContent: 'flex-end',
  },
  wrap: {
    borderRadius: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: Colors.light.border,
  },
  text: {
    height: Constants.InputHeight,
    marginLeft: 8,
    color: Colors.light.text,
    fontSize: 16,
    flex: 1,
  },
})