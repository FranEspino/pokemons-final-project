import React, { useContext, useEffect } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Favorites from '../screens/Favorites';
import MyStackPokemon from './MyStackPokemon';
import { FavoritesContext } from '../context/FavoriteContext';
import MyStackFavorite from './MyStackFavorite';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const {state} = useContext(FavoritesContext)


  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      swipeEdgeWidth: 0,
    }}
      gestureEnabled={false}
      initialRouteName={state.currentScreen}
   >
      <Drawer.Screen
        name="Pokemones"
        component={MyStackPokemon}
      />
      <Drawer.Screen
        name="Favorites"
        component={MyStackFavorite}
      />
      
    </Drawer.Navigator>
  );
};

export default MyDrawer;
