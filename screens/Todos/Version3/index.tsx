import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from 'constants/Colors';

import { AddTodoForm } from './Form';
import { TodosHeader } from './Header';
import { TodoList } from './List';
import { todoList } from './signals';

export const TodosV3 = (): JSX.Element => {
  const unfinishedCount = todoList.value.filter((item) => !item.isChecked).length;

  return (
    <View style={styles.layout}>
      {/* Form to add more todos */}
      <AddTodoForm />

      {/* Header with unfinished count */}
      <TodosHeader unfinishedCount={unfinishedCount} />

      {/* Actual list */}
      <TodoList />
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
