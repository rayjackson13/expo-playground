import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import Colors from 'constants/Colors';

import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

type Props = PressableProps & {
  children: ReactNode;
};

export const MenuItem = ({ children, ...props }: Props) => (
  <AnimatedTouchable style={styles.root} {...props}>
    <Text style={styles.text}>{children}</Text>
    <MaterialCommunityIcons color={Colors.light.text} name="chevron-right" size={22} />
  </AnimatedTouchable>
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  text: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
