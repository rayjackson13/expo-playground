import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import { Header } from 'components/Header';
import Colors from 'constants/Colors';
import { ContactsScreen } from 'screens/Contacts';
import { MenuTab } from 'screens/Menu';
import { MessagesScreen } from 'screens/Messages';

import { TransitionConfig } from '../helpers/TransitionConfig';

import type { TabParamList } from 'constants/types';
import type { SharedElementSceneComponent } from 'react-navigation-shared-element';

const Tabs = createBottomTabNavigator<TabParamList>();

const wrapInSharedElementStack = (Screen: SharedElementSceneComponent<any>, name: string) => {
  const SharedStack = createSharedElementStackNavigator();
  return () => (
    <SharedStack.Navigator
      initialRouteName={name}
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionConfig,
          close: TransitionConfig,
        },
      }}
    >
      <SharedStack.Screen component={Screen} name={name} />
    </SharedStack.Navigator>
  );
};

const ContactsTab = wrapInSharedElementStack(ContactsScreen, 'ContactsScreen');
const MessagesTab = wrapInSharedElementStack(MessagesScreen, 'MessagesScreen');

export const BottomTabNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        header: (props) => <Header hasBorder {...props} />,
        tabBarShowLabel: false,
        tabBarBackground: () => <View style={styles.background} />,
      }}
    >
      <Tabs.Screen
        component={ContactsTab}
        name="Contacts"
        options={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="account-group-outline" {...props} />,
        }}
      />
      <Tabs.Screen
        component={MessagesTab}
        name="Messages"
        options={{
          header: (props) => <Header hasBorder {...props} />,
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="chat-outline" {...props} />,
        }}
      />
      <Tabs.Screen
        component={MenuTab}
        name="Menu"
        options={{
          header: (props) => <Header hasBorder {...props} />,
          title: 'Playground',
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="menu" {...props} />,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.window,
  },
});
