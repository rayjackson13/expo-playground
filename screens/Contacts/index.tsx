import { FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import Contacts from '../../data/contacts.json';
import ContactListItem from './Item';
import ContactSearch from './Search';
import { useRef, useState } from 'react';
import { Contact } from '../../constants/types';
import { useSharedValue } from 'react-native-reanimated';

export default function ContactsScreen() {
  const [searchText, setSearchText] = useState('');
  const scrollOffset = useSharedValue(0);
  const scrollRef = useRef<FlatList<Contact>>(null);
  const items = Contacts.filter((contact) => contact.name.includes(searchText));

  const renderItem: ListRenderItem<Contact> = ({ item }) => <ContactListItem {...item} />

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  );

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = nativeEvent.contentOffset.y;
  };

  const scrollTo = (offset: number): void => 
    scrollRef.current?.scrollToOffset({ offset })

  const onDragEnd = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y: offset } = nativeEvent.contentOffset;

    if (offset <= 0) {
      scrollTo(0);
      return;
    }

    if (offset <= 48) {
      scrollTo(48);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Swipe up to access search.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ContactSearch onChange={setSearchText} value={searchText} offset={scrollOffset} />

      <FlatList
        bounces
        scrollEventThrottle={16}
        data={items}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listInner}
        ItemSeparatorComponent={renderDivider}
        ListHeaderComponent={renderHeader}
        onScroll={onScroll}
        contentOffset={{ x: 0, y: 48 }}
        onScrollEndDrag={onDragEnd}
        ref={scrollRef}
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
    overflow: 'hidden',
  },
  listInner: {
    paddingTop: 48 + 16,
    paddingBottom: 16,
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
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.light.secondary,
  }
});
