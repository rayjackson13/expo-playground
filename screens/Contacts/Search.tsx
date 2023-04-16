import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

export default function ContactSearch() {
  return (
    <View style={styles.root}>
      <View style={styles.wrap}>
        <MaterialCommunityIcons name="magnify" size={16} color={Colors.light.secondary} />
        <TextInput placeholder='Search' style={styles.text} placeholderTextColor={Colors.light.secondary} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
  },
  wrap: {
    marginHorizontal: 16,
    borderRadius: 16,
    height: 40,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.border,
  },
  text: {
    marginLeft: 8,
    color: Colors.light.text,
  },
})