import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import MessagesScreen from '../../screens/Messages';
import ChatScreen from '../../screens/Chat';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import PhotoPreviewScreen from '../../screens/PhotoPreview';
import { CardStyleInterpolators } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ContactDetailsScreen from '../../screens/ContactDetails';
import ContactsScreen from '../../screens/Contacts';

const Stack = createSharedElementStackNavigator();

const config: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 250,
    delay: 0,
  },
};

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: false,
        cardShadowEnabled: true,
        transitionSpec: {
          open: config,
          close: config,
        }
      }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen 
        name="ContactDetails" 
        component={ContactDetailsScreen} 
        options={{ headerShown: false }}
        sharedElements={(route) => {
          const { id } = route.params;

          return [
            `contact.${id}.avatar`,
            {
              id: 'contact.gradient',
              animation: 'fade',
            },
            {
              id: `contact.${id}.name`,
              animation: 'fade-in',
              resize: 'clip',
            },
            {
              id: 'contact.goBack',
              animation: 'fade',
            },
          ];
        }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ headerShown: false }}
        sharedElements={(route, otherRoute, showing) => {
          const { id } = route.params;

          return [
            `messages.${id}.avatar`,
            {
              id: 'messages.gradient',
              animation: 'fade',
            },
            {
              id: `messages.${id}.name`,
              animation: 'fade-in',
              resize: 'clip',
            },
            {
              id: 'messages.goBack',
              animation: 'fade',
            },
          ];
        }}
      />
      <Stack.Screen 
        name="PhotoPreview" 
        component={PhotoPreviewScreen} 
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          cardOverlayEnabled: false,
          cardShadowEnabled: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
    </Stack.Navigator>
  )
}