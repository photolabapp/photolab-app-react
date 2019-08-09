import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/login/Login'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  }
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

export default createAppContainer(AppNavigator)