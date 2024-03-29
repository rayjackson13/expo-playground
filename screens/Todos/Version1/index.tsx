import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from 'constants/Colors';

import { AddTodoForm } from './Form';
import { TodosHeader } from './Header';
import { TodoList } from './List';

import type { TodoItem } from '../declarations';

export const TodosV1 = (): JSX.Element => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const onSubmit = (item: TodoItem) => setTodoList((list) => [...list, item]);

  const toggleTodo = (id: number) =>
    setTodoList((list) =>
      list.map((item) => (item.id !== id ? item : { ...item, isChecked: !item.isChecked })),
    );

  const unfinishedCount = todoList.filter((item) => !item.isChecked).length;

  return (
    <View style={styles.layout}>
      {/* Form to add more todos */}
      <AddTodoForm onSubmit={onSubmit} />

      {/* Header with unfinished count */}
      <TodosHeader unfinishedCount={unfinishedCount} />

      {/* Actual list */}
      <TodoList todos={todoList} toggleTodo={toggleTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 16,
  },
});
