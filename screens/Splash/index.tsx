import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Animation from 'assets/splash.json';
import Colors from 'constants/Colors';

type Props = {
  setLoading: (value: boolean) => unknown;
};

export const SplashScreen = ({ setLoading }: Props) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.root}>
      <AnimatedLottieView
        autoPlay
        loop={false}
        onAnimationFinish={() => setLoading(false)}
        resizeMode="cover"
        source={Animation}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
});
