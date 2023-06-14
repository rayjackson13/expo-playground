import { FlatList, Keyboard, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import Contacts from '../../data/contacts.json';
import ContactListItem from './Item';
import { useEffect, useRef, useState } from 'react';
import { Contact } from '../../constants/types';
import { useSharedValue } from 'react-native-reanimated';
import Tip from './Tip';
import { StackScreenProps } from '@react-navigation/stack';
import ContactsHeader from './Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Constants } from './constants';

export default function ContactsScreen({ route }: StackScreenProps<{}>) {
  const [searchText, setSearchText] = useState('');
  const scrollOffset = useSharedValue(0);
  const headerVisible = useSharedValue(true);
  const scrollRef = useRef<FlatList<Contact>>(null);
  const items = Contacts.filter((contact) => contact.name.includes(searchText));

  const renderItem: ListRenderItem<Contact> = ({ item }) => <ContactListItem {...item} />

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  );

  const setHeaderVisible = (isVisible: boolean) => 
    setTimeout(() => {
      headerVisible.value = isVisible;
    }, 500);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = nativeEvent.contentOffset.y;
    Keyboard.dismiss();
  };

  const scrollTo = (offset: number): void => 
    scrollRef.current?.scrollToOffset({ offset })

  const onDragEnd = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y: offset } = nativeEvent.contentOffset;

    if (offset <= Constants.SearchHeight / 3) {
      scrollTo(0);
      setHeaderVisible(false);
      return;
    }

    if (offset <= Constants.SearchHeight) {
      scrollTo(Constants.SearchHeight);
      setHeaderVisible(true);
    }
  };

  const renderHeader = () => <Tip isVisible={headerVisible} />;

  useEffect(() => {
    setTimeout(() => {
      scrollTo(Constants.SearchHeight);
    }, 100);
  }, [])

  return (
    <>
      <ContactsHeader
        {...{ route, setSearchText, searchText, scrollOffset }}
      />

      <SafeAreaView edges={['top']} style={styles.container}>
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
          onScrollEndDrag={onDragEnd}
          ref={scrollRef}
        />
      </SafeAreaView>
    </>
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
    paddingTop: Constants.HeaderOpenHeight,
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
});
