import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Canvas, Circle, Fill, mix, useSharedValueEffect, useValue } from '@shopify/react-native-skia'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, withDecay, withRepeat, withTiming } from 'react-native-reanimated';

export default function SkiaScreen() {
  const { width } = useWindowDimensions();

  const leftBoundary = 0;
  const rightBoundary = width;
  const x = useValue(width / 2);
  const translateX = useSharedValue(width / 2);

  useSharedValueEffect(() => {
    x.current = translateX.value;
  }, translateX);
 
  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
    })
    .onEnd((e) => {
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
    });

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ flex: 1 }}>
        <Fill color="white" />
        <Circle cx={x} cy={40} r={20} color="#3E3E" />
        <Circle cx={x} cy={40} r={15} color="#AEAE" />
      </Canvas>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})