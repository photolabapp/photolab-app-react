import React from 'react'
import Colors from '../utils/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator,
    HeaderBackButton
} from 'react-navigation'
import Login from '../screens/login/Login'
import SignUp from '../screens/signup/SignUp'
import Add from '../screens/add/Add'
import Splash from '../screens/splash/Splash'
import Credit from '../screens/credit/Credit'
import Cart from '../screens/cart/Cart'
import CartAddress from '../screens/cart/CartAddress'
import CartSuccess from '../screens/cart/CartSuccess'
import Album from '../screens/album/Album'
import User from '../screens/user/User'

import HeaderLogo from '../components/HeaderLogo'

// LOGIN AND SIGNUP SCREEN
const loginStackNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: { header: null }
    },
    SignUp: {
        screen: SignUp,
        headerMode: 'screen',
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#31383E',
                elevation: 0,
                shadowOpacity: 0
            },
            title: 'Cadastro'
        }
    }
}, {
    initialRouteName: 'Login'
})

const albumStackNavigator = createStackNavigator({
    Album: {
        screen: Album,
        navigationOptions: { header: null }
    }
})

const uploadStackNavigator = createStackNavigator({
    Upload: {
        screen: Add,
        navigationOptions: { header: null }
    }
})

const creditStackNavigator = createStackNavigator({
    Credit: {
        screen: Credit,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerMode: 'screen',
            headerStyle: {
                backgroundColor: '#31383E',
                elevation: 0,
                shadowOpacity: 0
            },
            title: 'Crédito'
        }
    }
}, {
    headerLayoutPreset: 'center'
})

const userStackNavigator = createStackNavigator({
    User: {
        screen: User,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerMode: 'screen',
            headerStyle: {
                backgroundColor: '#31383E',
                elevation: 0,
                shadowOpacity: 0
            },
            title: 'Usuário'
        }
    }
})

const cartStackNavigator = createStackNavigator({
    Cart: {
        screen: Cart,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerMode: 'screen',
            headerStyle: {
                backgroundColor: '#31383E',
                elevation: 0,
                shadowOpacity: 0
            },
            title: 'Sacola de compras'
        }
    },
    CartAddress: {
        screen: CartAddress,
        navigationOptions: {
            headerMode: 'screen',
            title: 'Meus endereços'
        }
    },
    CartSuccess: {
        screen: CartSuccess,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (<HeaderBackButton onPress={_ => {
                    navigation.navigate("Album")
                    navigation.popToTop()
                }} />),
                headerMode: 'screen',
                title: 'Sucesso',
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    }
})

const bottomTab = createBottomTabNavigator({
    Album: albumStackNavigator,
    Cart: cartStackNavigator,
    Add: uploadStackNavigator,
    Credito: creditStackNavigator,
    User: userStackNavigator,
}, {
    initialRouteName: 'Album',
    navigationOptions: {
        header: null
    },
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
            } else if (routeName === 'User') {
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
})

const switchNavigator = createSwitchNavigator({
    Splash: { screen: Splash, headerMode: 'none' },
    App: bottomTab,
    Auth: loginStackNavigator,
}, { initialRouteName: 'Splash' })

export default createAppContainer(switchNavigator)