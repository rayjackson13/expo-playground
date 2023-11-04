import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Game2048 = () => {
  console.log('aaa')
  return (
    <View style={styles.root}>
      <Text>Game2048</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
