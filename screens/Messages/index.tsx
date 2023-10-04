import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { AnimatedTouchable } from 'components/AnimatedTouchable';
import Colors from 'constants/Colors';

import { StoriesView } from './StoriesView';

import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ListRenderItem } from 'react-native';

type Message = {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
};

const messages: Message[] = [
  {
    id: 0,
    avatar:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Bryan Cranston',
    lastMessage:
      "Hey Jesse, we need to cook! I'm already waiting for you in the RV. Bring equipment with you!",
  },
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80',
    name: 'Sia Venti',
    lastMessage: 'Hey! Where were you last night?',
  },
];

export const MessagesScreen = ({ navigation }: StackScreenProps<ParamListBase>) => {
  const renderItem: ListRenderItem<Message> = ({ item }) => {
    const { id, name, avatar, lastMessage } = item;
    const urlParams = new URLSearchParams();
    urlParams.append('avatar', avatar);
    urlParams.append('name', name);
    urlParams.append('lastMessage', lastMessage);
    const onPress = () =>
      navigation.navigate('Chat', {
        id,
        name,
        avatar,
        lastMessage,
      });

    return (
      <AnimatedTouchable onPress={onPress} style={styles.listItem}>
        <Image source={{ uri: avatar }} style={styles.listItemImage} />

        <View style={styles.listItemBody}>
          <Text style={styles.listItemName}>{name}</Text>
          <Text numberOfLines={2} style={styles.listItemText}>
            {lastMessage}
          </Text>
        </View>
      </AnimatedTouchable>
    );
  };

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={renderDivider}
        ListHeaderComponent={<StoriesView />}
        data={messages}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  list: {
    paddingBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  listItemBody: {
    flex: 1,
  },
  listItemImage: {
    borderRadius: 56,
    height: 64,
    marginRight: 16,
    width: 64,
  },
  listItemName: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  listItemText: {
    color: Colors.light.secondary,
    fontSize: 16,
  },
  separator: {
    flexShrink: 0,
    padding: 16,
    paddingLeft: 16 + 56 + 16,
    paddingVertical: 8,
  },
  separatorLine: {
    backgroundColor: Colors.light.border,
    height: 1,
  },
});
