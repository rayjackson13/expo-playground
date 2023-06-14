import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { SafeAreaView as SafeAreaViewBase } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AnimatedTouchable from './AnimatedTouchable';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';

type Props = {
  route: RouteProp<any>;
  hasBorder?: boolean;
  children?: React.ReactNode;
  canGoBack?: boolean;
  style?: AnimatedStyleProp<ViewStyle>;
  containerStyle?: AnimatedStyleProp<ViewStyle> | AnimatedStyleProp<ViewStyle>[];
  useAbsolute?: boolean;
};

const SafeAreaView = Animated.createAnimatedComponent(SafeAreaViewBase);

export default function Header({ 
  route,
  hasBorder,
  children,
  canGoBack,
  style,
  containerStyle,
  useAbsolute = true
}: Props) {
  const { goBack } = useNavigation();
  const renderBody = () => {
    if (!children) {
      return <Text style={styles.title}>{route.name}</Text>;
    }

    return children;
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.root, style]}>
      <Animated.View style={[styles.container, hasBorder && styles.hasBorder, containerStyle]}>
        {renderBody()}

          <View style={[StyleSheet.absoluteFill, styles.buttonRow, !useAbsolute && { zIndex: -1 }]}>
            <View style={styles.buttonWrap}>
              {canGoBack && (
                <AnimatedTouchable style={styles.button} onPress={() => goBack()}>
                  <MaterialIcons name="arrow-back-ios" size={18} color={Colors.light.text} />
                  <Text style={styles.buttonText}>Back</Text>
                </AnimatedTouchable>
              )}
            </View>

            <View style={styles.buttonWrap} />
          </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.light.background,
  },
  container: {
    position: 'relative',
    height: 48,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hasBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonWrap: {
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,    
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.light.text,
  }
})