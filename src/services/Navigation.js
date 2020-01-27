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
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Upload from '../screens/Upload'
import Splash from '../screens/Splash'
import Credit from '../screens/Credit'
import CartDetail from '../screens/Cart/CartDetail'
import CartShipping from '../screens/Cart/CartShipping'
import CartSuccess from '../screens/Cart/CartSuccess'
import Album from '../screens/Album'
import User from '../screens/User'
import CreateAddress from '../screens/Address/CreateAddress'
import { createAddress } from './Api';

//import HeaderLogo from '../components/HeaderLogo'

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
        screen: Upload,
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

const addressStackNavigator = createStackNavigator({
    CreateAddress: {
        screen: createAddress,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerMode: 'screen',
            headerStyle: {
                backgroundColor: '#31383E',
                elevation: 0,
                shadowOpacity: 0
            },
            title: 'Adiciona Endereço'
        }
    }
})

const cartStackNavigator = createStackNavigator({
    CartDetail: {
        screen: CartDetail,
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
    CartShipping: {
        screen: CartShipping,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerMode: 'screen',
            headerStyle: {
                backgroundColor: '#31383E',
                elevation: 0,
                shadowOpacity: 0
            },
            title: 'Entrega',
            tabBarOptions: {
                tabBarVisible: false
            }
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
}, {
    initialRouteName: 'CartShipping'
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

export default createAppContainer(cartStackNavigator)