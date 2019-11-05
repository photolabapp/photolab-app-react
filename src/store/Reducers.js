import { combineReducers, createStore } from 'redux';
import albumReducer from './AlbumReducer'
import orderReducer from './OrderReducer'
import userReducer from './UserReducer'
import AsyncStorage from '@react-native-community/async-storage';

const reducer = combineReducers({
    album: albumReducer,
    order: orderReducer,
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const configureStore = () => {
    return createStore(persistedReducer);
}

export default configureStore