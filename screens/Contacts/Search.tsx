import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ContactSearch() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Quick Search</Text>
      <MaterialCommunityIcons name="magnify" size={16} color={Colors.light.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.border,
  },
  text: {
    marginRight: 4,
    color: Colors.light.secondary,
  },
})