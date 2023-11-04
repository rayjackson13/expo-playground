import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import { Header } from 'components/Header';
import Colors from 'constants/Colors';
import { ContactsScreen } from 'screens/Contacts';
import { MenuTab } from 'screens/Menu';
import { MessagesScreen } from 'screens/Messages';

import type { TabParamList } from 'constants/types';

const Tabs = createBottomTabNavigator<TabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tabs.Navigator
      // initialRouteName="Contacts"
      screenOptions={{
        header: (props) => <Header hasBorder {...props} />,
        tabBarShowLabel: false,
        tabBarBackground: () => <View style={styles.background} />,
      }}
    >
      <Tabs.Screen
        component={ContactsScreen}
        name="Contacts"
        options={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTouchable {...props} />,
          tabBarIcon: (props) => <MaterialCommunityIcons name="account-group-outline" {...props} />,
        }}
      />
      <Tabs.Screen
        component={MessagesScreen}
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
