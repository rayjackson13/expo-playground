import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput as TextInputBase } from 'react-native-gesture-handler'
import Animated, { SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

type Props = {
  offset: SharedValue<number>;
  onChange: (value: string) => unknown;
  value: string;
}

const TextInput = Animated.createAnimatedComponent(TextInputBase);

const inputHeight = 48;

export default function ContactSearch({ offset, onChange, value }: Props) {
  const rootStyles = useAnimatedStyle(() => {
    const getTranslateY = (): number => {
      if (offset.value <= 0) {
        return 0;
      }

      if (offset.value >= inputHeight) {
        return -inputHeight + 1;
      }

      return -offset.value;
    }

    return ({
      height: offset.value >= 0 ? inputHeight : inputHeight - offset.value,
      transform: [{
        translateY: getTranslateY(),
      }]
    })
  });

  const wrapStyles = useAnimatedStyle(() => ({
    opacity: withSpring(offset.value > 0 ? 0 : 1),
  }));

  return (
    <Animated.View style={[styles.root, rootStyles]}>
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
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.background,
    zIndex: 1,
    justifyContent: 'flex-end',
  },
  wrap: {
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: Colors.light.border,
  },
  text: {
    height: 40,
    marginLeft: 8,
    color: Colors.light.text,
    flex: 1,
  },
})