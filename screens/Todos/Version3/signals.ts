import { signal } from '@preact/signals-react';

import type { TodoItem } from '../declarations';

export const todoList = signal<TodoItem[]>([]);

export const toggleTodo = (id: number) => {
  todoList.value = todoList.value.map((item) =>
    item.id !== id ? item : { ...item, isChecked: !item.isChecked },
  );
};
