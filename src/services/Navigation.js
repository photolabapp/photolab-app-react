import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/login/Login'
import SignUp from '../screens/signup/SignUp'

const AppNavigator = createStackNavigator({
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

export default createAppContainer(AppNavigator)