import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarStyle } from 'expo-status-bar';
import { ParamListBase, useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient';
import MessageList from '../../components/MessageList';

type RouteParams = ParamListBase & {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
}

const ChatScreen = ({ route, navigation }: StackScreenProps<RouteParams>) => {
  const insets = useSafeAreaInsets();

  const { id, avatar, name, lastMessage } = route.params as RouteParams;

  useFocusEffect(() => {
    setStatusBarStyle('inverted');
    return () => {
      setStatusBarStyle('dark');
    }
  });

  return (
    <SafeAreaView edges={['bottom']} style={styles.root}>
      <TouchableOpacity
        activeOpacity={.8}
        style={styles.avatarWrap}
        onPress={() => navigation.navigate('PhotoPreview', { uri: avatar })}
      >
        <SharedElement id={`messages.${id}.avatar`} style={StyleSheet.absoluteFill}>
          <Image source={{ uri: avatar as string }} style={[StyleSheet.absoluteFill]} />
        </SharedElement>

        <SharedElement id={`messages.gradient`} style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={['rgba(0,0,0,.2)', 'transparent', 'rgba(0,0,0,.3)']}
            style={StyleSheet.absoluteFill}
          />
        </SharedElement>

        <View style={styles.head}>
          <SharedElement id={`messages.${id}.name`}>
            <Text style={styles.name}>{name}</Text>
          </SharedElement>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { top: insets.top }]}>
        <SharedElement id={`messages.goBack`}>
          <View style={styles.backButtonWrap}>
            <MaterialIcons name="chevron-left" color={Colors.dark.text} size={32} />
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </SharedElement>
      </TouchableOpacity>

      <MessageList lastMessage={lastMessage} chatId={id} />

      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={8}>
        <View style={styles.footer}>
          <TextInput style={styles.input} placeholder="Type your message..." />
          <TouchableOpacity style={styles.send}>
            <MaterialIcons name="arrow-upward" color={Colors.dark.text} size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  backButton: {
    position: 'absolute',
    top: 0,
  },
  backButtonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 8,
    zIndex: 1,
  },
  backButtonText: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.dark.text,
  },
  avatarWrap: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  head: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.light.background,
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