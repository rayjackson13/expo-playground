import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MessagesScreen from '../../screens/Messages';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactsScreen from '../../screens/Contacts';
import { SharedElementSceneComponent, createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TransitionConfig } from '../helpers/TransitionConfig';
import Header from '../../components/Header';
import AnimatedTouchable from '../../components/AnimatedTouchable';
import MenuTab from '../../screens/Menu';
import { TabParamList } from '../../constants/types';

const Tabs = createBottomTabNavigator<TabParamList>();

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
        header: (props) => <Header hasBorder {...props} />,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Contacts"
        component={ContactsTab}
        options={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="account-group-outline" {...props} />,
        }}
      />
      <Tabs.Screen
        name="Messages"
        component={MessagesTab}
        options={{
          header: (props) => <Header hasBorder {...props} />,
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="chat-outline" {...props} />,
        }}
      />
      <Tabs.Screen
        name="Menu"
        component={MenuTab}
        options={{
          header: (props) => <Header hasBorder {...props} />,
          title: 'Playground',
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="menu" {...props} />,
        }}
      />
    </Tabs.Navigator>
  )
}