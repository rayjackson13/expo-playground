import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import MenuItem from './MenuItem';
import { RootTabScreenProps, StackParamList, TabParamList } from '../../constants/types';

type Screen = keyof StackParamList | keyof TabParamList;
type ItemType = {
  title: string;
  screen: Screen;
  params: StackParamList[Screen]
}

type Props = RootTabScreenProps<'Menu'>;

const items: ItemType[] = [
  {
    title: '2048 Game',
    screen: 'Game2048',
    params: {},
  },
  {
    title: 'Photo Preview',
    screen: 'PhotoPreview',
    params: {
      uri: 'https://images.unsplash.com/photo-1685475860105-80a4ea08804a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
  },
  {
    title: 'List Performance',
    screen: 'ListPerformance',
    params: {},
  }
];

export default function MenuTab({ navigation }: Props) {
  const renderItem: ListRenderItem<ItemType> = ({ item }): JSX.Element => {
    const onPress = (): void => navigation.navigate(item.screen, item.params);

    return (
      <MenuItem onPress={onPress}>{item.title}</MenuItem>   
    )
  }

  return (
    <FlatList
      style={styles.root}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.title + index}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
  }
})