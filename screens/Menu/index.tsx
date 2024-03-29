import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Colors from 'constants/Colors';

import { MenuItem } from './MenuItem';

import type { RootTabScreenProps, StackParamList, TabParamList } from 'constants/types';
import type { ListRenderItem } from 'react-native';

type Screen = keyof StackParamList | keyof TabParamList;
type ItemType = {
  title: string;
  screen: Screen;
  params: StackParamList[Screen];
};

type Props = RootTabScreenProps<'Menu'>;

const items: ItemType[] = [
  // {
  //   title: '2048 Game',
  //   screen: 'Game2048',
  //   params: {},
  // },
  // {
  //   title: 'Photo Preview',
  //   screen: 'PhotoPreview',
  //   params: {
  //     uri: 'https://images.unsplash.com/photo-1685475860105-80a4ea08804a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  //   },
  // },
  // {
  //   title: 'List Performance',
  //   screen: 'ListPerformance',
  //   params: {},
  // },
  {
    title: 'TODOs (state)',
    screen: 'TodosV1',
    params: {},
  },
  {
    title: 'TODOs (state, fixed)',
    screen: 'TodosV2',
    params: {},
  },
  {
    title: 'TODOs (signals)',
    screen: 'TodosV3',
    params: {},
  },
];

export const MenuTab = ({ navigation }: Props) => {
  const renderItem: ListRenderItem<ItemType> = ({ item }): JSX.Element => {
    const onPress = (): void => navigation.navigate(item.screen, item.params);

    return <MenuItem onPress={onPress}>{item.title}</MenuItem>;
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={items}
      keyExtractor={(item, index) => item.title + index}
      renderItem={renderItem}
      style={styles.root}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.light.background,
    flex: 1,
    paddingHorizontal: 16,
  },
  separator: {
    backgroundColor: Colors.light.border,
    height: 1,
    width: '100%',
  },
});
