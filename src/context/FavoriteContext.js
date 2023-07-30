import { createContext, useReducer } from "react";
import { prokemonReducer } from "./prokemonReducer";
import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();
var pokemonJson = []

if(storage.getString('pokemon') != null){
    const pokemonString = storage.getString('pokemon');
     pokemonJson = JSON.parse(pokemonString);
    
}

export const initialState = {
    favorites: pokemonJson,
    currentScreen : 'Pokemones'
};

export const FavoritesContext = createContext({initialState});


export const FavoritesProvider = ({children}) => {
    const [state, dispatch] = useReducer(prokemonReducer, initialState);

    const addFavorite = (newFavorite) => {
        dispatch({type: 'ADD_FAVORITE', payload: newFavorite})
    }

    const removeFavorite = (favoritePokemon) => {
        dispatch({type: 'REMOVE_FAVORITE', payload: favoritePokemon})
    }

    const changeScreen = (screen) => {
        dispatch({type: 'CHANGE_SCREEN', payload: screen})
    }

    return (
        <FavoritesContext.Provider
         value={{state, addFavorite, removeFavorite,initialState,changeScreen}}>
            {children}
        </FavoritesContext.Provider>

    )
}

