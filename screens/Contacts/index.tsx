import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Colors from '../../constants/Colors';
import Contacts from '../../data/contacts.json';
import { useState } from 'react';
import ContactListItem from './Item';
import ContactSearch from './Search';

type Contact = {
  id: number;
  avatar: string;
  name: string;
  online?: boolean;
}

export default function ContactsScreen({ navigation }: StackScreenProps<ParamListBase>) {
  const [isSearchVisible, setSearchVisible] = useState(true);

  const renderItem: ListRenderItem<Contact> = ({ item }) => <ContactListItem {...item} />

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  )

  return (
    <View style={styles.container}>
      <ContactSearch />

      <FlatList
        data={Contacts}
        renderItem={renderItem}
        style={styles.list}
        ItemSeparatorComponent={renderDivider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    paddingVertical: 16,
  },
  separator: {
    padding: 16,
    paddingVertical: 8,
    paddingLeft: 16 + 56 + 16,
    flexShrink: 0,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Colors.light.border,
  }
});
