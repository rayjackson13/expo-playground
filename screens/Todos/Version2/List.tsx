import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ListItem } from './ListItem';

import type { TodoItem } from '../declarations';
import type { ListRenderItem } from 'react-native';

type Props = {
  todos: TodoItem[];
  toggleTodo: (id: number) => unknown;
};

export const TodoList = ({ todos, toggleTodo }: Props) => {
  const data = useMemo(() => [...todos].sort((a, b) => b.id - a.id), [todos]);

  const keyExtractor = (item: TodoItem) => item.id.toString();

  const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
    <ListItem {...item} onSelectItem={toggleTodo} />
  );

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
