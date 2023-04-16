import { ListRenderItem, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SharedElement } from 'react-navigation-shared-element'
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';

type Props = {
  chatId: number;
  lastMessage: string;
}

export default function MessageList({ lastMessage, chatId }: Props) {
  const renderItem: ListRenderItem<string> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
      <View style={styles.arrow} />
      <View style={styles.arrowOverlap} />
    </View>
  )

  return (
    <FlatList
      data={[lastMessage, '123', 'Test Message']}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      inverted
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 8,
    flex: 1,
    paddingVertical: 8,
  },
  item: {
    position: 'relative',
    marginBottom: 8,
    backgroundColor: Colors.light.border,
    padding: 8,
    borderRadius: 16,
    maxWidth: '75%',
    alignSelf: 'flex-start',
  },
  arrow: {
    position: 'absolute',
    backgroundColor: Colors.light.border,
    width: 16,
    height: 16,
    bottom: 0,
    borderBottomRightRadius: 16,
    left: -8,
    zIndex: 1,
  },
  arrowOverlap: {
    position: 'absolute',
    backgroundColor: Colors.light.background,
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
  }
})