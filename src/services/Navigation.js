import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Login from '../screens/login/Login'
import SignUp from '../screens/signup/SignUp'
import Home from '../screens/home/Home'
import Splash from '../screens/splash/Splash'
import Config from '../screens/config/Config'
import Cart from '../screens/cart/Cart'
import HeaderLogo from '../components/HeaderLogo'

const loginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    headerMode: 'none',
    navigationOptions: {

    }
  },
  SignUp: {
    screen: SignUp,
    headerMode: 'screen',
    navigationOptions: {

    }
  }
}, {
    initialRouteName: 'Login'
  }
)

const header = {
  headerMode: 'screen',
  headerTitle: <HeaderLogo />,
  headerStyle: { backgroundColor: '#31383E' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
}

const bottomTab = createStackNavigator({
  Config: { screen: Config, navigationOptions: { headerTitle: 'Configuração' } },
  Upload: { screen: Home, navigationOptions: { headerTitle: 'Album' }  },
  Cart: { screen: Cart, navigationOptions: { headerTitle: 'Carrinho' }  }
}, {
    initialRouteName: 'Upload',
    headerMode: 'screen'
    /*
    navigationOptions: {
      headerTitle: <HeaderLogo />,
      headerStyle: { backgroundColor: '#31383E' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }
    */
  }
)

const switchNavigator = createSwitchNavigator({
  Splash: { screen: Splash, headerMode: 'none' },
  App: bottomTab,
  Auth: loginStackNavigator,
}, { initialRouteName: 'Splash' });

export default createAppContainer(bottomTab)