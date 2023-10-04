import { CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { Header } from 'components/Header';
import { ChatScreen } from 'screens/Chat';
import { ContactDetailsScreen } from 'screens/ContactDetails';
import { Game2048 } from 'screens/Game2048';
import { ListPerformance } from 'screens/ListPerformance';
import { PhotoPreviewScreen } from 'screens/PhotoPreview';

import { BottomTabNavigator } from './BottomTabNavigator';
import { TransitionConfig } from '../helpers/TransitionConfig';

import type { StackParamList } from 'constants/types';

const Stack = createSharedElementStackNavigator<StackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header canGoBack hasBorder {...props} />,
        cardOverlayEnabled: false,
        cardShadowEnabled: true,
        transitionSpec: {
          open: TransitionConfig,
          close: TransitionConfig,
        },
      }}
    >
      <Stack.Screen component={BottomTabNavigator} name="Root" options={{ headerShown: false }} />
      <Stack.Screen
        component={ContactDetailsScreen}
        name="ContactDetails"
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
      <Stack.Screen component={ChatScreen} name="Chat" options={{ headerShown: false }} />
      <Stack.Screen
        component={PhotoPreviewScreen}
        name="PhotoPreview"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          cardOverlayEnabled: false,
          cardShadowEnabled: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
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
    </Stack.Navigator>
  );
};
