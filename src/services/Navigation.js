import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Login from '../screens/login/Login'
import SignUp from '../screens/signup/SignUp'
import Add from '../screens/add/Add'
import Splash from '../screens/splash/Splash'
import Config from '../screens/config/Config'
import Cart from '../screens/cart/Cart'
import HeaderLogo from '../components/HeaderLogo'

const loginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    headerMode: 'none'
  },
  SignUp: {
    screen: SignUp,
    headerMode: 'screen'
  }
}, {
    initialRouteName: 'Login'
  }
)

const uploadStackNavigator = createStackNavigator({
  Upload: {
    screen: Add,
    navigationOptions: {
      headerTitle: 'Adicionar Fotos',
      headerStyle: { backgroundColor: '#31383E' }
    }
  }
})

const configStackNavigator = createStackNavigator({
  Config: { screen: Config, navigationOptions: { headerTitle: 'Configuração' } }
})

const cartStackNavigator = createStackNavigator({
  Cart: { screen: Cart, navigationOptions: { headerTitle: 'Carrinho' } }
})

const header = {
  headerMode: 'screen',
  headerTitle: <HeaderLogo />,
  headerStyle: { backgroundColor: '#31383E' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
}

const bottomTab = createBottomTabNavigator({
  Album: uploadStackNavigator,
  Cart: uploadStackNavigator,
  Add: uploadStackNavigator,
  Credito: configStackNavigator,
  Usuario: cartStackNavigator
})

const switchNavigator = createSwitchNavigator({
  Splash: { screen: Splash, headerMode: 'none' },
  App: bottomTab,
  Auth: loginStackNavigator,
}, { initialRouteName: 'Splash' });

export default createAppContainer(bottomTab)