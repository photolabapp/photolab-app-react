import { combineReducers, createStore } from 'redux';
import albumReducer from './AlbumReducer'
import orderReducer from './OrderReducer'
import userReducer from './UserReducer'

const reducer = combineReducers({
    album: albumReducer,
    order: orderReducer,
    user: userReducer
})

const configureStore = () => {
    return createStore(reducer);
}

export default configureStore