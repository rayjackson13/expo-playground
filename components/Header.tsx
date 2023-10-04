import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView as SafeAreaViewBase } from 'react-native-safe-area-context';

import Colors from 'constants/Colors';

import { AnimatedTouchable } from './AnimatedTouchable';

import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import type { ViewStyle } from 'react-native';
import type { AnimatedStyleProp } from 'react-native-reanimated';

type Props = {
  route: RouteProp<any>;
  hasBorder?: boolean;
  children?: React.ReactNode;
  canGoBack?: boolean;
  headerTitle?: string;
  options?: BottomTabNavigationOptions | StackNavigationOptions;
  style?: AnimatedStyleProp<ViewStyle>;
  containerStyle?: AnimatedStyleProp<ViewStyle> | AnimatedStyleProp<ViewStyle>[];
  useAbsolute?: boolean;
};

const SafeAreaView = Animated.createAnimatedComponent(SafeAreaViewBase);

export const Header = ({
  route,
  hasBorder,
  children,
  canGoBack,
  style,
  options,
  containerStyle,
  useAbsolute = true,
}: Props) => {
  const { goBack } = useNavigation();
  const renderBody = () => {
    if (!children) {
      return <Text style={styles.title}>{options?.title || route.name}</Text>;
    }

    return children;
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.root, style]}>
      <Animated.View style={[styles.container, hasBorder && styles.hasBorder, containerStyle]}>
        {renderBody()}

        <View style={[StyleSheet.absoluteFill, styles.buttonRow, !useAbsolute && styles.zIndex]}>
          <View style={styles.buttonWrap}>
            {canGoBack && (
              <AnimatedTouchable onPress={() => goBack()} style={styles.button}>
                <MaterialIcons color={Colors.light.text} name="arrow-back-ios" size={18} />
                <Text style={styles.buttonText}>Back</Text>
              </AnimatedTouchable>
            )}
          </View>

          <View style={styles.buttonWrap} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '400',
  },
  buttonWrap: {
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  hasBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
  },
  root: {
    backgroundColor: Colors.light.window,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  zIndex: {
    zIndex: -1,
  },
});
