import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import MessagesScreen from '../../screens/Messages';
import ChatScreen from '../../screens/Chat';

const Stack = createSharedElementStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}