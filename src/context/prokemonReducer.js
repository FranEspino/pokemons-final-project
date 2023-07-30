


export const prokemonReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.name !== action.payload)
            }
        case 'CHANGE_SCREEN':
            return {
                ...state,
                currentScreen: action.payload
            }
        default:
            return state;
    }

}