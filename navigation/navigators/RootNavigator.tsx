import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from 'components/Header';
import { ChatScreen } from 'screens/Chat';
import { ContactDetailsScreen } from 'screens/ContactDetails';
import { Game2048 } from 'screens/Game2048';
import { ListPerformance } from 'screens/ListPerformance';
import { PhotoPreviewScreen } from 'screens/PhotoPreview';
import { OldTodos } from 'screens/Todos/Version1';

import { BottomTabNavigator } from './BottomTabNavigator';

import type { StackParamList } from 'constants/types';

const Stack = createNativeStackNavigator<StackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header canGoBack hasBorder {...props} />,
      }}
    >
      <Stack.Screen component={BottomTabNavigator} name="Root" options={{ headerShown: false }} />
      <Stack.Screen
        component={ContactDetailsScreen}
        name="ContactDetails"
        options={{ headerShown: false }}
      />
      <Stack.Screen component={ChatScreen} name="Chat" options={{ headerShown: false }} />
      <Stack.Screen
        component={PhotoPreviewScreen}
        name="PhotoPreview"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        component={Game2048}
        name="Game2048"
        options={{
          title: '2048',
        }}
      />
      <Stack.Screen
        component={ListPerformance}
        name="ListPerformance"
        options={{ title: 'List Performance' }}
      />
      <Stack.Screen
        component={OldTodos}
        name="OldTodos"
        options={{ title: 'TODOs (state-based)' }}
      />
    </Stack.Navigator>
  );
};
