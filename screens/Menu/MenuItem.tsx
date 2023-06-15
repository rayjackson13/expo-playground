import { PressableProps, StyleSheet, Text } from 'react-native'
import React, { ReactNode } from 'react'
import AnimatedTouchable from '../../components/AnimatedTouchable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type Props = PressableProps & {
  children: ReactNode;
}

export default function MenuItem({ children, ...props }: Props) {
  return (
    <AnimatedTouchable style={styles.root} {...props}>
      <Text style={styles.text}>{children}</Text>
      <MaterialCommunityIcons name="chevron-right" size={22} color={Colors.light.text} />
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: Colors.light.text,
  }
})