import React, { Component } from 'react'
import Colors from '../utils/Colors'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
//'react-native-vector-icons/FontAwesome'
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'


import Login from '../screens/login/Login'
import SignUp from '../screens/signup/SignUp'
import Add from '../screens/add/Add'
import Splash from '../screens/splash/Splash'
import Config from '../screens/config/Config'
import Cart from '../screens/cart/Cart'
import Album from '../screens/album/Album'
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

const albumStackNavigator = createStackNavigator({
  Upload: {
    screen: Album,
    navigationOptions: {
      headerTitle: 'Album',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.greyPrimary },
    }
  }
}, {
    headerLayoutPreset: 'center'
  })

const uploadStackNavigator = createStackNavigator({
  Upload: {
    screen: Cart,
    navigationOptions: {
      headerTitle: 'Adicionar Fotos',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.greyPrimary },
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
      headerStyle: { backgroundColor: Colors.greyPrimary },
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
      headerStyle: { backgroundColor: Colors.greyPrimary }
    }
  }
}, {
    headerLayoutPreset: 'center'
  })

const bottomTab = createBottomTabNavigator({
  Album: albumStackNavigator,
  Cart: cartStackNavigator,
  Add: uploadStackNavigator,
  Credito: configStackNavigator,
  Usuario: configStackNavigator
}, {
    initialRouteName: 'Album',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        if (routeName === 'Add') {
          return <Icon name="add-circle-outline" size={40} color="#fff" />
        } else if (routeName === 'Album') {
          return <Icon name="photo-album" size={22} color="#fff" />
        } else if (routeName === 'Cart') {
          return <Icon name="shopping-cart" size={22} color="#fff" />
        } else if (routeName === 'Credito') {
          return <Icon name="credit-card" size={25} color="#fff" />
        } else if (routeName === 'Usuario') {
          return <Icon name="perm-identity" size={25} color="#fff" />
        }
      }
    }),
    tabBarOptions: {
      inactiveTintColor: 'white',
      showIcon: true,
      showLabel: false,
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

export default createAppContainer(albumStackNavigator)