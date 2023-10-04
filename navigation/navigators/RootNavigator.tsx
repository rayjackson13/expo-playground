import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import ChatScreen from '../../screens/Chat';
import PhotoPreviewScreen from '../../screens/PhotoPreview';
import { CardStyleInterpolators } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ContactDetailsScreen from '../../screens/ContactDetails';
import { TransitionConfig } from '../helpers/TransitionConfig';
import Header from '../../components/Header';
import { StackParamList } from '../../constants/types';
import Game2048 from '../../screens/Game2048';
import ListPerformance from '../../screens/ListPerformance';

const Stack = createSharedElementStackNavigator<StackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header hasBorder canGoBack {...props} />,
        cardOverlayEnabled: false,
        cardShadowEnabled: true,
        transitionSpec: {
          open: TransitionConfig,
          close: TransitionConfig,
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
      <Stack.Screen
        name="Game2048"
        component={Game2048}
        options={{
          title: '2048',
        }}
      />
      <Stack.Screen
        name="ListPerformance"
        component={ListPerformance}
        options={{ title: 'List Performance' }}
      />
    </Stack.Navigator>
  )
}