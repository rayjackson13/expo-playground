import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Redirect, useRouter, useSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ChatScreen = () => {
  const { avatar, id, lastMessage, name } = useSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!id) {
    return <Redirect href={'/'} />
  }

  return (
    <>
      <StatusBar style='light' />

      <SafeAreaView edges={['bottom']} style={styles.root}>
        <Image source={{ uri: avatar as string }} style={styles.avatar} />

        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { top: insets.top }]}>
          <MaterialIcons name="chevron-left" color={Colors.dark.text} size={32} />
          <Text style={styles.backButtonText}>To Messages</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.head}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.start}>
            This is the start of your conversation with this person.
            {'\n'}
            Please respect our community guidelines.
          </Text>
        </ScrollView>

        <KeyboardAvoidingView behavior='padding' style={styles.footer} keyboardVerticalOffset={8}>
          <TextInput style={styles.input} placeholder="Type your message..." />
          <TouchableOpacity style={styles.send}>
            <MaterialIcons name="arrow-upward" color={Colors.dark.text} size={24} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.dark.text,
  },
  head: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
    color: '#2e2e2e',
    marginBottom: 16,
    textAlign: 'center',
  },
  start: {
    fontSize: 14,
    fontWeight: '300',
    color: "#515151",
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 8,
    borderColor: '#c3c3c3'
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