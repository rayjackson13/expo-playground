import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { Header } from 'components/Header';
import Colors from 'constants/Colors';

import { ContactSearch } from './Search';
import { Constants } from './constants';

import type { RouteProp } from '@react-navigation/native';
import type { SharedValue } from 'react-native-reanimated';

type Props = {
  route: RouteProp<{}, never>;
  searchText: string;
  setSearchText: (text: string) => unknown;
  scrollOffset: SharedValue<number>;
};

export const ContactsHeader = ({ route, setSearchText, searchText, scrollOffset }: Props) => {
  const containerStyle = useAnimatedStyle(() => {
    const getHeight = () => {
      if (scrollOffset.value < 0) {
        return Constants.HeaderOpenHeight - scrollOffset.value;
      }

      return interpolate(
        scrollOffset.value,
        [0, Constants.SearchHeight],
        [Constants.HeaderOpenHeight, Constants.HeaderHeight],
        Extrapolate.CLAMP,
      );
    };

    return {
      height: getHeight(),
      paddingBottom: interpolate(
        scrollOffset.value,
        [0, Constants.SearchHeight],
        [8, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <Header
      containerStyle={[styles.container, containerStyle]}
      hasBorder
      route={route}
      style={styles.header}
      useAbsolute={false}
    >
      <View style={styles.main}>
        <Text style={styles.title}>Contacts</Text>
      </View>
      <ContactSearch offset={scrollOffset} onChange={setSearchText} value={searchText} />
    </Header>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: Colors.light.window,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 999,
  },
  main: {
    alignItems: 'center',
    height: Constants.HeaderHeight,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
});
