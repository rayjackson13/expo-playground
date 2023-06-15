import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type Contact = {
  id: number;
  avatar: string;
  name: string;
  online?: boolean;
}

export type TabParamList = {
  Contacts: undefined;
  Messages: undefined;
  Menu: undefined;
}

export type StackParamList = ParamListBase & {
  ContactDetails: {
    id: number;
    avatar: string;
    name: string;
    lastMessage: string;
  };
  Chat: {
    id: number;
    avatar: string;
    name: string;
    lastMessage: string;
  };
  PhotoPreview: {
    uri: string;
  };
  Game2048: undefined;
}

export type RootStackScreenProps<Screen extends keyof StackParamList> = StackScreenProps<
  StackParamList,
  Screen
>;

export type RootTabScreenProps<Screen extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, Screen>,
  StackScreenProps<StackParamList>
>;