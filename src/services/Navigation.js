import React from 'react'
import Colors from '../utils/Colors'
import { Icon } from 'react-native-elements'
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
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.greyPrimary }
    }
  }
}, {
    headerLayoutPreset: 'center'
  })

const configStackNavigator = createStackNavigator({
  Config: {
    screen: Config,
    navigationOptions: {
      headerTitle: 'Configuração',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.greyPrimary }
    }
  }
}, {
    headerLayoutPreset: 'center'
  })

const cartStackNavigator = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      headerTitle: 'Carrinho',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.greyPrimary },
    }
  }
}, {
    headerLayoutPreset: 'center'
  })

const bottomTab = createBottomTabNavigator({
  Album: configStackNavigator,
  Cart: configStackNavigator,
  Add: uploadStackNavigator,
  Credito: configStackNavigator,
  Usuario: cartStackNavigator
}, {
    initialRouteName: 'Album',
    lazy: false,
    navigationOptions: {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Icon name='g-translate' color='#ffffff' />
      }
    },
    tabBarOptions: {
      inactiveTintColor: 'white',
      inactiveBackgroundColor: Colors.greyPrimary,
      activeBackgroundColor: Colors.greySecundary,
      activeTintColor: 'white'
    }
  }
)

const switchNavigator = createSwitchNavigator({
  Splash: { screen: Splash, headerMode: 'none' },
  App: bottomTab,
  Auth: loginStackNavigator,
}, { initialRouteName: 'Splash' })

export default createAppContainer(bottomTab)