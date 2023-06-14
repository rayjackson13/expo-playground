import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AnimatedTouchable from './AnimatedTouchable';

type Props = {
  route: RouteProp<any>;
  hasBorder?: boolean;
  children?: React.ReactNode;
  canGoBack?: boolean;
};

export default function Header({ route, hasBorder, children, canGoBack }: Props) {
  const { goBack } = useNavigation();
  const renderBody = () => {
    if (!children) {
      return <Text style={styles.title}>{route.name}</Text>;
    }

    return children;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <View style={[styles.container, hasBorder && styles.hasBorder]}>
        {renderBody()}

          <View style={[StyleSheet.absoluteFill, styles.buttonRow]}>
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
      </View>
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
    fontWeight: '500',
    fontSize: 18,
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