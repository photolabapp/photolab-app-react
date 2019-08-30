import { combineReducers, createStore } from 'redux';
import albumReducer from './AlbumReducer'

const reducer = combineReducers({
    album: albumReducer
})

const configureStore = () => {
    return createStore(reducer);
}

export default configureStore