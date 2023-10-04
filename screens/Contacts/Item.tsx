import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import Colors from 'constants/Colors';

type Props = {
  id: number;
  avatar: string;
  name: string;
};

export const ContactListItem = ({ id, avatar, name }: Props) => {
  const navigation = useNavigation<any>();
  const urlParams = new URLSearchParams();
  urlParams.append('avatar', avatar);
  urlParams.append('name', name);
  const onPress = () =>
    navigation.navigate('ContactDetails', {
      id,
      name,
      avatar,
    });

  return (
    <AnimatedTouchable onPress={onPress} style={styles.listItem}>
      <SharedElement id={`contact.${id}.avatar`}>
        <Image source={{ uri: avatar }} style={styles.listItemImage} />
      </SharedElement>

      <View style={styles.listItemBody}>
        <SharedElement id={`contact.${id}.name`}>
          <Text style={styles.listItemName}>{name}</Text>
        </SharedElement>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  listItemBody: {
    flex: 1,
  },
  listItemImage: {
    borderRadius: 48,
    height: 48,
    marginRight: 16,
    width: 48,
  },
  listItemName: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
});
