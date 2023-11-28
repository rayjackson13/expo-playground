import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from 'constants/Colors';

import type { TodoItem } from '../declarations';

type Props = TodoItem & {
  onSelectItem: (id: number) => unknown;
};

export const ListItem = ({ id, isChecked, onSelectItem, title }: Props) => {
  console.log('ListItem render');

  const onPress = () => onSelectItem(id);

  const textStyle = [styles.text, isChecked && styles.strikethrough];

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.checkbox}>{isChecked && <View style={styles.checkboxFill} />}</View>

      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderColor: Colors.light.secondary,
    borderRadius: 4,
    borderWidth: 1,
    height: 24,
    marginRight: 8,
    width: 24,
  },
  checkboxFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.secondary,
    borderRadius: 2,
    margin: 4,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  strikethrough: {
    textDecorationColor: Colors.light.secondary,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  text: {
    marginTop: 4,
  },
});
