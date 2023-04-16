import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import AnimatedLottieView from 'lottie-react-native';
import Animation from '../../assets/splash.json';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
  setLoading: (value: boolean) => unknown;
}

export default function SplashScreen({ setLoading }: Props) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.root}>
      <AnimatedLottieView
        source={Animation}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={() => setLoading(false)}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});