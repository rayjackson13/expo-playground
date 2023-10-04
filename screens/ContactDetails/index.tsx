import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { setStatusBarStyle } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import Colors from 'constants/Colors';

import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

type RouteParams = ParamListBase & {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
};

export const ContactDetailsScreen = ({ route, navigation }: StackScreenProps<RouteParams>) => {
  const insets = useSafeAreaInsets();

  const { id, avatar, name } = route.params as RouteParams;

  useFocusEffect(() => {
    setStatusBarStyle('inverted');
    return () => {
      setStatusBarStyle('dark');
    };
  });

  return (
    <SafeAreaView edges={['bottom']} style={styles.root}>
      <AnimatedTouchable
        onPress={() => navigation.navigate('PhotoPreview', { uri: avatar })}
        style={styles.avatarWrap}
      >
        <SharedElement id={`contact.${id}.avatar`} style={StyleSheet.absoluteFill}>
          <Image source={{ uri: avatar as string }} style={[StyleSheet.absoluteFill]} />
        </SharedElement>

        <SharedElement id={'contact.gradient'} style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={['rgba(0,0,0,.2)', 'transparent', 'rgba(0,0,0,.3)']}
            style={StyleSheet.absoluteFill}
          />
        </SharedElement>

        <View style={styles.head}>
          <SharedElement id={`contact.${id}.name`}>
            <Text style={styles.name}>{name}</Text>
          </SharedElement>
        </View>
      </AnimatedTouchable>

      <AnimatedTouchable
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { top: insets.top }]}
      >
        <SharedElement id={'contact.goBack'}>
          <View style={styles.backButtonWrap}>
            <MaterialIcons color={Colors.dark.text} name="chevron-left" size={32} />
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </SharedElement>
      </AnimatedTouchable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarWrap: {
    height: 300,
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 0,
  },
  backButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '400',
  },
  backButtonWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 8,
    zIndex: 1,
  },
  head: {
    bottom: 0,
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
  },
  name: {
    color: Colors.light.background,
    fontSize: 20,
    fontWeight: '500',
  },
  root: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
});
