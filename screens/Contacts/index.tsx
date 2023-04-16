import { LayoutChangeEvent, ListRenderItem, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import Contacts from '../../data/contacts.json';
import ContactListItem from './Item';
import ContactSearch from './Search';
import { useState } from 'react';
import { Contact } from '../../constants/types';
import { FlatList } from 'react-native-gesture-handler';


export default function ContactsScreen() {
  const [searchText, setSearchText] = useState('');
  const items = Contacts.filter((contact) => contact.name.includes(searchText));

  const renderItem: ListRenderItem<Contact> = ({ item }) => <ContactListItem {...item} />

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ContactSearch onChange={setSearchText} value={searchText} />

      <FlatList
        bounces
        scrollEventThrottle={16}
        data={items}
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
    overflow: 'hidden',
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
  },
  search: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  }
});
