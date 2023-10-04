import { FontAwesome5 } from '@expo/vector-icons';
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

    <FontAwesome5 color={Colors.light.secondary} name="chevron-right" size={14} />
  </AnimatedTouchable>
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  text: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
