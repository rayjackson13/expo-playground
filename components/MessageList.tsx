import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Colors from 'constants/Colors';

import type { ListRenderItem } from 'react-native';

type Props = {
  chatId: number;
  lastMessage: string;
};

export const MessageList = ({ lastMessage }: Props) => {
  const renderItem: ListRenderItem<string> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
      <View style={styles.arrow} />
      <View style={styles.arrowOverlap} />
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={[lastMessage, '123', 'Test Message']}
      inverted
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  arrow: {
    backgroundColor: Colors.light.border,
    borderBottomRightRadius: 16,
    bottom: 0,
    height: 16,
    left: -8,
    position: 'absolute',
    width: 16,
    zIndex: 1,
  },
  arrowOverlap: {
    backgroundColor: Colors.light.background,
    borderBottomRightRadius: 18,
    bottom: -6,
    height: 35,
    left: -20,
    position: 'absolute',
    width: 20,
    zIndex: 1,
  },
  item: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.border,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '75%',
    padding: 12,
    position: 'relative',
  },
  list: {
    backgroundColor: Colors.light.background,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
});
