import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

type Props = {
  onChange: (value: string) => unknown;
  value: string;
}

export default function ContactSearch({ onChange, value }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.wrap}>
        <MaterialCommunityIcons name="magnify" size={16} color={Colors.light.secondary} />
        <TextInput
          placeholder='Search'
          style={styles.text}
          placeholderTextColor={Colors.light.secondary}
          value={value}
          onChangeText={onChange}
          returnKeyType="search"
          numberOfLines={1}
        />
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
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.border,
  },
  text: {
    height: 40,
    marginLeft: 8,
    color: Colors.light.text,
    flex: 1,
  },
})