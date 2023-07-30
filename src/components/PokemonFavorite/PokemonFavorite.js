import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PokemonFavorite = ({name, img, onPress}) => {
  const UpperCaseFirstLetter = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={{width: 150, margin: 12}}>
        <LinearGradient
          style={{borderRadius: 20, padding: 5}}
          colors={['#FFF3E0', '#FFCC80', '#FF8F00']}>
          <Image
            style={{width: 100, height: 100, alignSelf: 'center'}}
            source={{
              uri: img,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              padding: 5,
              textAlign: 'center',
            }}>
            {UpperCaseFirstLetter(name)}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default PokemonFavorite;
