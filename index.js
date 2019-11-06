import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import Navigation from './src/services/Navigation'
import { PersistGate } from 'redux-persist/integration/react'
import { name as appName } from './app.json'

import storeConfig from './src/store/Reducers'

const store = storeConfig().store
const persistor = storeConfig().persistor
const Redux = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux)