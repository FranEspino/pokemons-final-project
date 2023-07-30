import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import PokemonItem from '../components/PokemonItem';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { FavoritesContext } from '../context/FavoriteContext';

const Pokemons = stack => {
  const [pokemons, setPokemons] = useState([]);
  const {changeScreen} = useContext(FavoritesContext)


  const fetchApiPokemon = async () => {
    const resp = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0',
    );
    setPokemons(resp.data.results);
  };

  const goToDetail = url => {
    changeScreen('Pokemones')
    stack.navigation.navigate('PokemonDetail', {url});
  };
  useEffect(() => {
    fetchApiPokemon();
  }, []);

  return (
    <View style={{marginBottom: 100}}>
      <View
        style={{
          backgroundColor: '#252525',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
        }}>
        <TouchableOpacity style={{marginLeft: 10}}>
          <Icon
            name="menu"
            size={30}
            color="#fff"
            onPress={() => stack.navigation.toggleDrawer()}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#fff',
          }}>
          Lista de Pokemones
        </Text>
      </View>

      <FlatList
        data={pokemons}
        renderItem={({item}) => (
          <PokemonItem
            name={item.name}
            url={item.url}
            onPress={() => goToDetail(item.url)}
          />
        )}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default Pokemons;
