import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';
import Favorites from '../screens/Favorites';

const Stack = createStackNavigator();
const MyStackFavorite = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FD8106'}}>
      <StatusBar backgroundColor="#424242" barStyle="light-content" />
      <Stack.Navigator
        gestureEnabled={false}
        initialRouteName="Favorites"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#212121',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Favorites"
          component={Favorites}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PokemonDetail"
          component={PokemonDetail}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MyStackFavorite;
