import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import { Header } from 'components/Header';
import { MessageList } from 'components/MessageList';
import Colors from 'constants/Colors';

import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

type RouteParams = ParamListBase & {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
};

export const ChatScreen = ({ route, navigation }: StackScreenProps<RouteParams>) => {
  const { id, avatar, name, lastMessage } = route.params as RouteParams;
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();

  const onSendPressed = () => setText('');

  const sendStyle = useAnimatedStyle(() => {
    const color = text.length ? Colors.light.tint : Colors.light.secondary;

    return {
      backgroundColor: withTiming(color, { duration: 250 }),
      opacity: withTiming(text.length ? 1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <>
      <Header canGoBack hasBorder route={route}>
        <AnimatedTouchable
          onPress={() => navigation.navigate('ContactDetails', { avatar, id, name })}
          style={styles.info}
        >
          <Image source={{ uri: avatar as string }} style={styles.avatar} />

          <Text style={styles.name}>{name}</Text>
        </AnimatedTouchable>
      </Header>

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-insets.bottom}
        style={styles.root}
      >
        <View style={styles.flex}>
          <MessageList chatId={id} lastMessage={lastMessage} />

          <View style={[styles.footer, { paddingBottom: 8 + insets.bottom }]}>
            <AnimatedTouchable onPress={onSendPressed} style={styles.attach}>
              <MaterialIcons color={Colors.light.secondary} name="attach-file" size={24} />
            </AnimatedTouchable>

            <TextInput
              multiline
              onChangeText={setText}
              placeholder="Message"
              style={styles.input}
              value={text}
            />

            <AnimatedTouchable onPress={onSendPressed} style={[styles.send, sendStyle]}>
              <MaterialIcons color={Colors.dark.text} name="arrow-upward" size={24} />
            </AnimatedTouchable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  attach: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  avatar: {
    borderRadius: 32,
    height: 32,
    marginRight: 8,
    width: 32,
  },
  flex: {
    flex: 1,
  },
  footer: {
    alignItems: 'flex-end',
    backgroundColor: Colors.light.window,
    borderColor: Colors.light.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 8,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
  },
  input: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
    marginHorizontal: 8,
    maxHeight: 200,
    paddingBottom: 7,
    paddingHorizontal: 8,
    paddingTop: 7,
  },
  name: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: '600',
  },
  root: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  send: {
    alignItems: 'center',
    borderRadius: 32,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
});
