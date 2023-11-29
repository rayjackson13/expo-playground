import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ListItem } from './ListItem';
import { todoList } from './signals';

import type { TodoItem } from '../declarations';
import type { ListRenderItem } from 'react-native';

export const TodoList = () => {
  const data = [...todoList.value].sort((a, b) => b.id - a.id);

  const keyExtractor = (item: TodoItem) => item.id.toString();

  const renderItem: ListRenderItem<TodoItem> = ({ item }) => <ListItem {...item} />;

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
});
