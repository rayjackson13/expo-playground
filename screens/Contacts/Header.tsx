import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { RouteProp } from '@react-navigation/native'
import { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import ContactSearch from './Search'
import { Constants } from './constants'
import Colors from '../../constants/Colors'

type Props = {
  route: RouteProp<{}, never>;
  searchText: string;
  setSearchText: (text: string) => unknown;
  scrollOffset: SharedValue<number>;
}

export default function ContactsHeader({ route, setSearchText, searchText, scrollOffset }: Props) {
  const containerStyle = useAnimatedStyle(() => {
    const getHeight = () => {
      if (scrollOffset.value < 0) {
        return Constants.HeaderOpenHeight - scrollOffset.value;
      }

      return interpolate(
        scrollOffset.value,
        [0, Constants.SearchHeight],
        [Constants.HeaderOpenHeight, Constants.HeaderHeight],
        Extrapolate.CLAMP
      );
    }

    return ({ 
      height: getHeight(),
      paddingBottom: interpolate(scrollOffset.value, [0, Constants.SearchHeight], [8, 0], Extrapolate.CLAMP),
    })
  });

  return (
    <Header 
      route={route}
      hasBorder
      style={styles.header}
      containerStyle={[styles.container, containerStyle]}
      useAbsolute={false}
    >
      <View style={styles.main}>
        <Text style={styles.title}>Contacts</Text>
      </View>
      <ContactSearch onChange={setSearchText} value={searchText} offset={scrollOffset} />
    </Header>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.light.window,
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    top: 0,
  },
  container: {
    justifyContent: 'space-between',
  },
  main: {
    height: Constants.HeaderHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  }
})