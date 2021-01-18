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
import CartPayment from '../screens/Cart/CartPayment'
import CartCheckout from '../screens/Cart/CartCheckout'
import CartCreditCardCheckout from '../screens/Cart/CartCreditCardCheckout'
import Album from '../screens/Album'
import User from '../screens/User'
import CreateAddress from '../screens/Address/CreateAddress'
import CreateCreditCard from '../screens/CreditCard/CreateCreditCard'

//import HeaderLogo from '../components/HeaderLogo'

const headerStyle = () => {
    return {
        backgroundColor: '#31383E',
        elevation: 0,
        shadowOpacity: 0
    }
}

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
            headerStyle: headerStyle(),
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
            headerStyle: headerStyle(),
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
            headerStyle: headerStyle(),
            title: 'Usuário'
        }
    }
})

const addressStackNavigator = createStackNavigator({
    CreateAddress: {
        screen: CreateAddress,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (<HeaderBackButton tintColor={'white'} onPress={_ => {
                    navigation.popToTop()
                    navigation.navigate('CartShipping')
                } } />),
                //headerMode: 'screen',
                //mode: 'modal',
                headerStyle: headerStyle(),
                headerTintColor: '#ffffff',
                title: 'Adicionar endereço',
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    }
}, {
    mode: 'modal',
    headerMode: 'screen',
})

const creditCardStackNavigator = createStackNavigator({
    CreateCreditCard: {
        screen: CreateCreditCard,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (<HeaderBackButton tintColor={'white'} onPress={_ => {
                    navigation.popToTop()
                    navigation.navigate('CartPayment')
                } } />),
                //headerMode: 'screen',
                //mode: 'modal',
                headerStyle: headerStyle(),
                headerTintColor: '#ffffff',
                title: 'Adicionar cartão de crédito',
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    }
}, {
    mode: 'modal',
    headerMode: 'screen',
})

const cartStackNavigator = createStackNavigator({
    CartDetail: {
        screen: CartDetail,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (<HeaderBackButton tintColor={'white'} onPress={_ => navigation.navigate("Album")} />),
                headerMode: 'screen',
                headerStyle: headerStyle(),
                headerTintColor: '#ffffff',
                title: 'Sacola de compra',
                tabBarVisible: false,
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    },
    CartShipping: {
        screen: CartShipping,
        navigationOptions: ({ navigation }) => {
            return {
                headerMode: 'screen',
                headerStyle: headerStyle(),
                headerTintColor: '#ffffff',
                title: 'Tipo de entrega',
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    },
    CartPayment: {
        screen: CartPayment,
        navigationOptions: ({ navigation }) => {
            return {
                headerMode: 'screen',
                headerStyle: headerStyle(),
                headerTintColor: '#ffffff',
                title: 'Forma de pagamento',
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    },
    CartCreditCardCheckout: {
        screen: CartCreditCardCheckout,
        navigationOptions: ({ navigation }) => {
            return {
                headerMode: 'screen',
                headerStyle: headerStyle(),
                headerTintColor: '#ffffff',
                title: 'Cartão de Crédito',
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    },
    CartCheckout: {
        screen: CartCheckout,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (<HeaderBackButton tintColor={'white'} onPress={_ => {
                    navigation.popToTop()
                    navigation.navigate("Album")
                }} />),
                headerMode: 'screen',
                headerStyle: headerStyle(),
                headerTintColor: '#ffffff',
                title: 'Pedido finalizado',
                tabBarOptions: {
                    tabBarVisible: false
                }
            }
        },
    },
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
    })
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
    Address: addressStackNavigator,
    CreditCard: creditCardStackNavigator
}, { initialRouteName: 'Splash' })

export default createAppContainer(switchNavigator)