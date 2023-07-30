import React from 'react';
import MyStack from './src/navigator/MyStack';
import 'react-native-gesture-handler';
import {FavoritesProvider} from './src/context/FavoriteContext';
const App = () => {
  return (
    <FavoritesProvider>
       <MyStack />
    </FavoritesProvider>
  );
};

export default App;
