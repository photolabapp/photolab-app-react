import {AppRegistry} from 'react-native'
import Navigator from './src/services/Navigation'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => Navigator)