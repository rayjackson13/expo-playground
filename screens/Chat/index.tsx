import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import MessageList from '../../components/MessageList';
import Header from '../../components/Header';
import AnimatedTouchable from '../../components/AnimatedTouchable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type RouteParams = ParamListBase & {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
}

const ChatScreen = ({ route, navigation }: StackScreenProps<RouteParams>) => {
  const { id, avatar, name, lastMessage } = route.params as RouteParams;
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();

  const onSendPressed = () => setText('');

  const sendStyle = useAnimatedStyle(() => {
    const color = text.length ? Colors.light.tint : Colors.light.secondary;

    return {
      backgroundColor: withTiming(color, { duration: 250 }),
      opacity: withTiming(text.length ? 1 : .5, { duration: 250 })
    };
  });

  return (
    <>
      <Header hasBorder canGoBack route={route}>
        <AnimatedTouchable
          style={styles.info}
          onPress={() => navigation.navigate('ContactDetails', { avatar, id, name })}
        >
          <SharedElement id={`contact.${id}.avatar`}>
            <Image source={{ uri: avatar as string }} style={styles.avatar} />
          </SharedElement>

          <SharedElement id={`contact.${id}.name`}>
            <Text style={styles.name}>{name}</Text>
          </SharedElement>
        </AnimatedTouchable>
      </Header>

      <KeyboardAvoidingView behavior="padding" style={styles.root} keyboardVerticalOffset={-insets.bottom}>
        <View style={{ flex: 1, paddingBottom: insets.bottom }}>
          <MessageList lastMessage={lastMessage} chatId={id} />

          <View style={[styles.footer]}>
            <AnimatedTouchable style={styles.attach} onPress={onSendPressed}>
              <MaterialIcons name="attach-file" color={Colors.light.secondary} size={24} />
            </AnimatedTouchable>

            <TextInput
              multiline
              style={styles.input}
              placeholder="Message"
              value={text}
              onChangeText={setText}
            />

            <AnimatedTouchable style={[styles.send, sendStyle]} onPress={onSendPressed}>
              <MaterialIcons name="arrow-upward" color={Colors.dark.text} size={24} />
            </AnimatedTouchable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.window,
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButtonWrap: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 1,
  },
  backButtonText: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.light.text,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.window,
    padding: 8,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    maxHeight: 200,
  },
  attach: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  send: {
    height: 32,
    width: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
})