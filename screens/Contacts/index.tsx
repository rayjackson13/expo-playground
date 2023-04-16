import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Colors from '../../constants/Colors';
import Contacts from '../../data/contacts.json';

type Contact = {
  id: number;
  avatar: string;
  name: string;
  online?: boolean;
}

export default function ContactsScreen({ navigation }: StackScreenProps<ParamListBase>) {
  const renderItem: ListRenderItem<Contact> = ({ item }) => {
    const { id, name, avatar } = item;
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

  const renderDivider = () => (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={Contacts}
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
