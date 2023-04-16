import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import MessagesScreen from '../../screens/Messages';
import ChatScreen from '../../screens/Chat';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

const Stack = createSharedElementStackNavigator();

const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 2,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          headerShown: false,
          cardOverlayEnabled: false,
          cardShadowEnabled: true,
          transitionSpec: {
            open: config,
            close: config,
          }
        }}
        sharedElements={(route, otherRoute, isShowing) => {
          const { id } = route.params;

          return [
            `messages.${id}.avatar`,
            {
              id: `messages.${id}.name`,
              animation: 'fade-in',
              resize: 'clip',
            },
            {
              id:`messages.goBack`,
              animation: 'fade'
            },
          ];
        }}
      />
    </Stack.Navigator>
  )
}