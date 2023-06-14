import { Image, ListRenderItem, StyleSheet, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Contacts from '../../data/contacts.json';
import Colors from '../../constants/Colors';
import { Contact } from '../../constants/types';
import AnimatedTouchable from '../../components/AnimatedTouchable';

export default function StoriesView() {
  const items = Contacts.filter(item => !!item.online);

  const renderItem: ListRenderItem<Contact> = ({ item }) => (
    <AnimatedTouchable>
      <Image source={{ uri: item.avatar }} style={styles.image} />
    </AnimatedTouchable>
  )

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={styles.inner}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  inner: {
    paddingHorizontal: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 32,
    borderColor: Colors.light.secondary,
    borderWidth: 2,
  },
  separator: {
    width: 8,
  },
})