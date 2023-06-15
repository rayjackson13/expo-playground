import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MessagesScreen from '../../screens/Messages';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactsScreen from '../../screens/Contacts';
import { SharedElementSceneComponent, createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TransitionConfig } from '../helpers/TransitionConfig';
import Header from '../../components/Header';
import AnimatedTouchable from '../../components/AnimatedTouchable';

const Tabs = createBottomTabNavigator();

const wrapInSharedElementStack = (
  Screen: SharedElementSceneComponent<any>,
  name: string,
) => {
  const SharedStack = createSharedElementStackNavigator();
  return () => (
    <SharedStack.Navigator
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionConfig,
          close: TransitionConfig,
        }
      }}
      initialRouteName={name}>
      <SharedStack.Screen name={name} component={Screen} />
    </SharedStack.Navigator>
  );
};

const ContactsTab = wrapInSharedElementStack(ContactsScreen, 'ContactsScreen');
const MessagesTab = wrapInSharedElementStack(MessagesScreen, 'MessagesScreen');

export default function BottomTabNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        header: (props) => <Header hasBorder {...props} />
      }}
    >
      <Tabs.Screen
        name="Contacts"
        component={ContactsTab}
        options={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="account-group-outline" {...props} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="Messages"
        component={MessagesTab}
        options={{
          header: (props) => <Header useAbsolute={false} hasBorder {...props} />,
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="chat-outline" {...props} />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs.Navigator>
  )
}