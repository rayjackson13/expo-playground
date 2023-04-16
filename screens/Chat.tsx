import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarStyle } from 'expo-status-bar';
import { ParamListBase, useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient';

type RouteParams = ParamListBase & {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
}

const ChatScreen = ({ route, navigation }: StackScreenProps<RouteParams>) => {
  const insets = useSafeAreaInsets();

  const { id, avatar, name } = route.params as RouteParams;

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
          <Image source={{ uri: avatar as string }} style={StyleSheet.absoluteFill} />
        </SharedElement>

        <SharedElement id={`messages.gradient`} style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={['rgba(0,0,0,.2)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
        </SharedElement>
      </TouchableOpacity>

      <SharedElement id={`messages.goBack`} style={{position: 'absolute'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { top: insets.top }]}>
          <MaterialIcons name="chevron-left" color={Colors.dark.text} size={32} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </SharedElement>

      <ScrollView contentContainerStyle={styles.head}>
        <SharedElement id={`messages.${id}.name`}>
          <Text style={styles.name}>{name}</Text>
        </SharedElement>

        <Text style={styles.start}>
          This is the start of your conversation with this person.
          {'\n'}
          Please respect our community guidelines.
        </Text>
      </ScrollView>

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
  },
  backButton: {
    position: 'absolute',
    left: 8,
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
  avatarWrap: {
    width: '100%',
    height: 200,
    position: 'relative',
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