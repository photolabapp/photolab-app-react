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
  },
  SignUp: {
    screen: SignUp,
  }
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

/*
const homeStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: <HeaderLogo />,
      headerStyle: {
        backgroundColor: '#31383E',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
})
*/

/*
const home = {
  screen: Home,
  navigationOptions: {
    headerTitle: <HeaderLogo />,
    headerStyle: {
      backgroundColor: '#31383E',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
}
*/

const bottomTab = createBottomTabNavigator({
  Home: {screen: Home},
  Config: {screen: Config},
  Cart: {screen: Cart}
})

const switchNavigator = createSwitchNavigator({
  Splash: { screen: Splash, navigationOptions: { header: null } },
  App: bottomTab,
  Auth: loginStackNavigator,
},
  {
    initialRouteName: 'Splash'
  },
);

export default createAppContainer(switchNavigator)