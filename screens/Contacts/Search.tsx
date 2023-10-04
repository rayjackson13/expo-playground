import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as TextInputBase } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import Colors from 'constants/Colors';

import { Constants } from './constants';

import type { SharedValue } from 'react-native-reanimated';

type Props = {
  offset: SharedValue<number>;
  onChange: (value: string) => unknown;
  value: string;
};

const TextInput = Animated.createAnimatedComponent(TextInputBase);

export const ContactSearch = ({ offset, onChange, value }: Props) => {
  const wrapStyles = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value, [56, 0], [0, 1]);
    const height = interpolate(
      offset.value,
      [0, Constants.SearchHeight],
      [Constants.InputHeight, 0],
      Extrapolate.CLAMP,
    );

    return { opacity, height };
  });

  return (
    <Animated.View style={[styles.wrap, wrapStyles]}>
      <MaterialCommunityIcons color={Colors.light.secondary} name="magnify" size={16} />
      <TextInput
        numberOfLines={1}
        onChangeText={onChange}
        placeholder="Search"
        placeholderTextColor={Colors.light.secondary}
        returnKeyType="search"
        style={styles.text}
        value={value}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.light.text,
    flex: 1,
    fontSize: 16,
    height: Constants.InputHeight,
    marginLeft: 8,
  },
  wrap: {
    alignItems: 'center',
    backgroundColor: Colors.light.border,
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 0,
    paddingHorizontal: 8,
  },
});
