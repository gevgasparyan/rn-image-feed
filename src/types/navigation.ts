import { StackScreenProps } from '@react-navigation/stack';

export type StackNavigatorParams = {
  [key: string]: any;
};

export type NavProps = StackScreenProps<StackNavigatorParams>;
