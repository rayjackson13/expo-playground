import { LayoutChangeEvent, ListRenderItem, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import Contacts from '../../data/contacts.json';
import ContactListItem from './Item';
import ContactSearch from './Search';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring } from 'react-native-reanimated';
import { useState } from 'react';

type Contact = {
  id: number;
  avatar: string;
  name: string;
  online?: boolean;
}

const SEARCH_HEIGHT = 56;

export default function ContactsScreen() {
  const scrollOffset = useSharedValue(1);
  const [initialScrollHeight, setInitialScrollHeight] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offset = event.contentOffset.y;

    if (offset <= -SEARCH_HEIGHT) {
      runOnJS(setSearchVisible)(true);
    }

    if (offset > 0) {
      runOnJS(setSearchVisible)(false);
    }

    scrollOffset.value = offset;
  });

  const onScrollLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setInitialScrollHeight(nativeEvent.layout.height);
  }

  const renderItem: ListRenderItem<Contact> = ({ item }) => <ContactListItem {...item} />

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  );

  const searchStyle = useAnimatedStyle(() => {
    const offset = interpolate(-scrollOffset.value, [0, -SEARCH_HEIGHT], [0, -SEARCH_HEIGHT]);
    const translateY = withSpring(
      searchVisible ? offset : offset - SEARCH_HEIGHT,
      {
        overshootClamping: true,
        mass: 1,
        stiffness: 2000,
        damping: 500,
      },
    );

    return { transform: [{ translateY }] };
  });

  const listStyle = useAnimatedStyle(() => {
    const offset = interpolate(-scrollOffset.value, [0, -SEARCH_HEIGHT], [0, -SEARCH_HEIGHT]);
    const paddingTop = withSpring(
      !searchVisible ? offset : offset + SEARCH_HEIGHT,
      {
        overshootClamping: true,
        mass: 1,
        stiffness: 2000,
        damping: 500,
      },
    );

    return { paddingTop };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.search, searchStyle]}>
        <ContactSearch />
      </Animated.View>

      <Animated.FlatList
        bounces
        onLayout={onScrollLayout}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={Contacts}
        renderItem={renderItem}
        style={[styles.list, listStyle]}
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
    paddingBottom: 16,
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
