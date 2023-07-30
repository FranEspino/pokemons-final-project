import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import {MMKV} from 'react-native-mmkv';
import {styles} from './PokemonDetailStyle';
import { FavoritesContext } from '../../context/FavoriteContext';

const storage = new MMKV();

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const PokemonDetail = stack => {
  const url = stack.route.params.url;
  const [detail, setDetail] = useState({});
  const [favorites, setFavorites] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  const {addFavorite,state} = useContext(FavoritesContext)

  useEffect(() => {
    if (storage.getString('pokemon') != null) {
      const pokemonString = storage.getString('pokemon');
      const pokemonJson = JSON.parse(pokemonString);
      setFavorites(pokemonJson);
    }
    fecthDetailPokemon();
  }, []);


  useEffect(() => {
    if (favorites.length > 0) {
      if (favorites.find(item => item.name === detail.name)) {
        setIsFavorited(true);
      }
    }
  }, [detail]);

  const fecthDetailPokemon = async () => {
    const resp = await axios.get(url);
    setDetail(resp.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.basicInfo}>
        {detail.base_experience ? (
          <Text style={styles.experience}>
            {`${detail.base_experience} EP`}
          </Text>
        ) : (
          <ShimmerPlaceHolder style={styles.shimmerTitle} />
        )}
        {detail.sprites?.other['official-artwork'].front_default ? (
          <Image
            style={styles.imgPokemon}
            source={{
              uri: detail.sprites?.other['official-artwork'].front_default,
            }}
          />
        ) : (
          <ShimmerPlaceHolder style={styles.shimmerImgPokemon} />
        )}
      </View>
        <TouchableOpacity
        onPress={() => {
         
          if(state.currentScreen === 'Pokemones'){
            stack.navigation.navigate('Pokemones')
          }else{
            stack.navigation.navigate('Favorites')
          }
        }}
        >
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

      <TouchableOpacity
        style={styles.fabFavorites}
        onPress={() => {
          const pokemon = {
            name: detail.name,
            url: url,
            img: detail.sprites?.other['official-artwork'].front_default,
          };
          if (favorites.length > 0) {
            if (!isFavorited) {
              if (favorites.find(item => item.name === pokemon.name)) {
                setIsFavorited(true);
                Snackbar.show({
                  backgroundColor: '#FD8106',
                  textColor: '#fff',
                  text: 'Pokemon ya esta en favoritos',
                  duration: Snackbar.LENGTH_LONG,
                });
                return;
              } else {
                setIsFavorited(true);
                addFavorite(pokemon)
                favorites.push(pokemon);
                
                storage.set('pokemon', JSON.stringify(favorites));
                Snackbar.show({
                  backgroundColor: '#FD8106',
                  textColor: '#fff',
                  text: 'Pokemon agregado a favoritos',
                  duration: Snackbar.LENGTH_LONG,
                });
              }
            } else {
              setIsFavorited(false);
              const newFavorites = favorites.filter(
                item => item.name !== pokemon.name,
              );
              storage.set('pokemon', JSON.stringify(newFavorites));
              Snackbar.show({
                backgroundColor: '#FD8106',
                textColor: '#fff',
                text: 'Pokemon eliminado de favoritos',
                duration: Snackbar.LENGTH_LONG,
              });
            }
          } else {
            storage.set('pokemon', JSON.stringify([pokemon]));
            Snackbar.show({
              text: 'Pokemon agregado a favoritos',
              duration: Snackbar.LENGTH_LONG,
            });
          }
        }}>
        <Icon name="heart" size={28} color={isFavorited ? '#F1403A' : '#fff'} />
      </TouchableOpacity>
      <View style={styles.detail}>
        {detail.name ? (
          <Text style={styles.name}>{detail.name}</Text>
        ) : (
          <ShimmerPlaceHolder style={styles.shimmerName} />
        )}
        <View style={styles.containerInfo}>
          <Text style={styles.titleInfoPokemon}>Basic Info</Text>
          <Icon
            style={styles.iconInfo}
            name="information-circle"
            size={28}
            color="#000"
          />
        </View>

        <View style={styles.itemDetailContainer}>
          <Text style={styles.itemDetail}>{`Height: ${detail.height} m`}</Text>
          <View style={styles.dividerDetail} />
          <Text style={styles.itemDetail}>{`Weigth: ${detail.weight} kg`}</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.titleInfoPokemon}>Habilities Info</Text>
          <Icon style={styles.iconInfo} name="bulb" size={28} color="#000" />
        </View>

        <View style={styles.itemDetailContainer}>
          <ScrollView horizontal={true}>
            {detail.abilities?.map((item, index) => (
              <Text key={index} style={styles.detailHabilities}>
                {`${item.ability.name}:  ${item.slot} 🔥 `}
              </Text>
            ))}
          </ScrollView>
        </View>
        <ScrollView>
          <View style={styles.containerImagesSprites}>
            {detail.sprites?.front_default ? (
              <Image
                style={styles.sprites1}
                source={{
                  uri: detail.sprites?.front_default,
                }}
              />
            ) : (
              <ShimmerPlaceHolder style={styles.shimmerImgSprites} />
            )}
            {detail.sprites?.front_shiny ? (
              <Image
                style={styles.sprites1}
                source={{
                  uri: detail.sprites?.back_default,
                }}
              />
            ) : (
              <ShimmerPlaceHolder style={styles.shimmerImgSprites} />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default PokemonDetail;
