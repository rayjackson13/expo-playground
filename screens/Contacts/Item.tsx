import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

type Props = {
  id: number;
  avatar: string;
  name: string;
}

export default function ContactListItem({ id, avatar, name }: Props) {
  const navigation = useNavigation();
  const urlParams = new URLSearchParams();
  urlParams.append('avatar', avatar);
  urlParams.append('name', name);
  const onPress = () => navigation.navigate('ContactDetails', {
    id, name, avatar
  });

  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <SharedElement id={`contact.${id}.avatar`}>
        <Image source={{ uri: avatar }} style={styles.listItemImage} />
      </SharedElement>

      <View style={styles.listItemBody}>
        <SharedElement id={`contact.${id}.name`}>
          <Text style={styles.listItemName}>{name}</Text>
        </SharedElement>
      </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  listItemImage: {
    width: 48,
    height: 48,
    borderRadius: 48,
    marginRight: 16,
  },
  listItemBody: {
    flex: 1,
  },
  listItemName: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 4,
    color: Colors.light.text,
  },
  listItemText: {
    fontSize: 16,
    color: Colors.light.secondary,
  },
})