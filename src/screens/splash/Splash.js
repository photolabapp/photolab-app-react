import React, { Component } from 'React'
import { AsyncStorage, View } from 'react-native'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class Splash extends Component {
    constructor(props) {
        super(props)
        this.isLogged()
    }

    render() {
        return (
            <View></View>
        )
    }

    isLogged = () => {
        AsyncStorage.getItem('ACCESS_TOKEN', function (err, value) {
            if (value == null) {
                this.props.navigation.navigate('Auth');
            } else {
                this.props.navigation.navigate('App');
            }
        })
    }
}