import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import Navigation from './src/services/Navigation'
import { name as appName } from './app.json'

import storeConfig from './src/store/Reducers'

const store = storeConfig()
const Redux = () => {
    return (
        <Provider store={store} >
            <Navigation />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux)