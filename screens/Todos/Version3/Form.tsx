import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Colors from 'constants/Colors';

import type { TodoItem } from '../declarations';

type Props = {
  onSubmit: (item: TodoItem) => unknown;
};

export const AddTodoForm = ({ onSubmit }: Props) => {
  console.log('AddTodoForm render');

  const [name, setName] = useState('');

  const onChangeText = (text: string) => setName(text);

  const onButtonPressed = () => {
    const title = name.trim();
    if (!title) {
      return;
    }

    setName('');
    onSubmit({
      id: new Date().getTime(),
      title: title,
      isChecked: false,
    });
  };

  return (
    <View style={styles.root}>
      <TextInput
        onChangeText={onChangeText}
        onSubmitEditing={onButtonPressed}
        placeholder="Start typing..."
        returnKeyType="done"
        style={styles.input}
        value={name}
      />

      <TouchableOpacity onPress={onButtonPressed} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 4,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    borderColor: Colors.light.secondary,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 8,
  },
  root: {
    flexDirection: 'row',
  },
});
