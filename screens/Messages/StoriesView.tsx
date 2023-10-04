import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import Colors from 'constants/Colors';
import Contacts from 'data/contacts.json';

import type { Contact } from 'constants/types';
import type { ListRenderItem } from 'react-native';

export const StoriesView = () => {
  const items = Contacts.filter((item) => !!item.online);

  const renderItem: ListRenderItem<Contact> = ({ item }) => (
    <AnimatedTouchable>
      <Image source={{ uri: item.avatar }} style={styles.image} />
    </AnimatedTouchable>
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.inner}
      data={items}
      horizontal
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.root}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderColor: Colors.light.secondary,
    borderRadius: 32,
    borderWidth: 2,
    height: 80,
    width: 80,
  },
  inner: {
    paddingHorizontal: 16,
  },
  root: {
    paddingBottom: 24,
    paddingTop: 16,
  },
  separator: {
    width: 8,
  },
});
