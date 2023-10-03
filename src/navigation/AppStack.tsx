import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import { ImageFeedDetailsScreen, ImageFeedScreen } from 'src/screens';

import routes from './routes';

const MainStackNavigator = createStackNavigator();

const AppStack: FC = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator.Navigator>
        <MainStackNavigator.Screen name={routes.imageFeed} component={ImageFeedScreen} options={{ title: 'Feed' }} />
        <MainStackNavigator.Screen
          name={routes.imageDetails}
          component={ImageFeedDetailsScreen}
          options={{ title: '', headerBackTitleVisible: false }}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
