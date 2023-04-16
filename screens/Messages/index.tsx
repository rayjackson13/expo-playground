import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import StoriesView from './StoriesView';

type Message = {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
}

const messages: Message[] = [
  {
    id: 0,
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Bryan Cranston',
    lastMessage: 'Hey Jesse, we need to cook! I\'m already waiting for you in the RV. Bring equipment with you!'
  },
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80',
    name: 'Sia Venti',
    lastMessage: 'Hey! Where were you last night?'
  },
];

export default function MessagesScreen({ navigation }: StackScreenProps<ParamListBase>) {
  const renderItem: ListRenderItem<Message> = ({ item }) => {
    const { id, name, avatar, lastMessage } = item;
    const urlParams = new URLSearchParams();
    urlParams.append('avatar', avatar);
    urlParams.append('name', name);
    urlParams.append('lastMessage', lastMessage);
    const onPress = () => navigation.navigate('Chat', {
      id, name, avatar, lastMessage
    });

    return (
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <Image source={{ uri: avatar }} style={styles.listItemImage} />

        <View style={styles.listItemBody}>
          <Text style={styles.listItemName}>{name}</Text>
          <Text style={styles.listItemText} numberOfLines={2}>{lastMessage}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  )

  return (
    <View style={styles.container}>
      <StoriesView />

      <FlatList
        data={messages}
        renderItem={renderItem}
        style={styles.list}
        ItemSeparatorComponent={renderDivider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    paddingVertical: 16,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  listItemImage: {
    width: 64,
    height: 64,
    borderRadius: 56,
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
  separator: {
    padding: 16,
    paddingVertical: 8,
    paddingLeft: 16 + 56 + 16,
    flexShrink: 0,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Colors.light.border,
  }
});
