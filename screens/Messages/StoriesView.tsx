import { Image, ListRenderItem, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Contacts from '../../data/contacts.json';
import Colors from '../../constants/Colors';
import { Contact } from '../../constants/types';

export default function StoriesView() {
  const items = Contacts.filter(item => !!item.online);

  const renderItem: ListRenderItem<Contact> = ({ item }) => (
    <TouchableOpacity>
      <Image source={{ uri: item.avatar }} style={styles.image} />
    </TouchableOpacity>
  )

  return (
    <View>
      <FlatList
        data={items}
        renderItem={renderItem}
        horizontal
        style={styles.root}
        contentContainerStyle={{ flex: 0 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 16,
    paddingBottom: 8,
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