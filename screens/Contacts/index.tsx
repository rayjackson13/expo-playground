import { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from 'constants/Colors';
import Contacts from 'data/contacts.json';

import { ContactsHeader } from './Header';
import { ContactListItem } from './Item';
import { Tip } from './Tip';
import { Constants } from './constants';

import type { StackScreenProps } from '@react-navigation/stack';
import type { Contact } from 'constants/types';
import type { ListRenderItem, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const ContactsScreen = ({ route }: StackScreenProps<{}>) => {
  const [searchText, setSearchText] = useState('');
  const scrollOffset = useSharedValue(0);
  const tipVisible = useSharedValue(true);
  const scrollRef = useRef<FlatList<Contact>>(null);
  const items = Contacts.filter((contact) => contact.name.includes(searchText));

  const renderItem: ListRenderItem<Contact> = ({ item }) => <ContactListItem {...item} />;

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  );

  const setTipVisible = (isVisible: boolean) =>
    setTimeout(() => {
      tipVisible.value = isVisible;
    }, 500);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = nativeEvent.contentOffset.y;
    Keyboard.dismiss();
  };

  const scrollTo = (offset: number): void => scrollRef.current?.scrollToOffset({ offset });

  const onDragEnd = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y: offset } = nativeEvent.contentOffset;

    if (offset <= Constants.SearchHeight / 3) {
      scrollTo(0);
      setTipVisible(false);
      return;
    }

    if (offset <= Constants.SearchHeight) {
      scrollTo(Constants.SearchHeight);
      setTipVisible(true);
    }
  };

  const renderHeader = () => <Tip isVisible={tipVisible} />;

  useEffect(() => {
    setTimeout(() => {
      scrollTo(Constants.SearchHeight + 1);
    }, 200);
  }, []);

  return (
    <>
      <ContactsHeader {...{ route, setSearchText, searchText, scrollOffset }} />

      <SafeAreaView edges={['top']} style={styles.container}>
        <FlatList
          ItemSeparatorComponent={renderDivider}
          ListHeaderComponent={renderHeader}
          bounces
          contentContainerStyle={styles.listInner}
          data={items}
          onScroll={onScroll}
          onScrollEndDrag={onDragEnd}
          ref={scrollRef}
          renderItem={renderItem}
          scrollEventThrottle={16}
          style={styles.list}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  list: {
    overflow: 'hidden',
  },
  listInner: {
    paddingBottom: 16,
    paddingTop: Constants.HeaderOpenHeight,
  },
  separator: {
    flexShrink: 0,
    padding: 16,
    paddingLeft: 16 + 56 + 16,
    paddingVertical: 8,
  },
  separatorLine: {
    backgroundColor: Colors.light.border,
    height: 1,
  },
});
