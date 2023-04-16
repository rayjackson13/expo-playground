import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import MessageList from '../../components/MessageList';
import Header from '../../components/Header';

type RouteParams = ParamListBase & {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
}

const ChatScreen = ({ route, navigation }: StackScreenProps<RouteParams>) => {
  const { id, avatar, name, lastMessage } = route.params as RouteParams;

  return (
    <>
      <Header hasBorder canGoBack route={route}>
        <TouchableOpacity
          activeOpacity={.8}
          style={styles.info}
          onPress={() => navigation.navigate('ContactDetails', { avatar, id, name })}
        >
          <SharedElement id={`contact.${id}.avatar`}>
            <Image source={{ uri: avatar as string }} style={styles.avatar} />
          </SharedElement>

          <SharedElement id={`contact.${id}.name`}>
            <Text style={styles.name}>{name}</Text>
          </SharedElement>
        </TouchableOpacity>
      </Header>

      <View style={styles.root}>
        <MessageList lastMessage={lastMessage} chatId={id} />

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={8}>
          <View style={styles.footer}>
            <TextInput style={styles.input} placeholder="Type your message..." />
            <TouchableOpacity style={styles.send}>
              <MaterialIcons name="arrow-upward" color={Colors.dark.text} size={24} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 8,
    borderColor: Colors.light.border
  },
  input: {
    flex: 1,
    height: 32,
    marginRight: 8,
  },
  send: {
    width: 32,
    height: 32,
    backgroundColor: Colors.light.text,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  }
})