import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from 'constants/Colors';

type Props = {
  unfinishedCount: number;
};

export const TodosHeader = ({ unfinishedCount }: Props) => {
  console.log('TodosHeader render');

  return (
    <View style={styles.root}>
      <Text style={styles.text}>You have {unfinishedCount} unfinished items.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
  },
  text: {
    color: Colors.light.secondary,
    fontSize: 12,
    textAlign: 'center',
  },
});
