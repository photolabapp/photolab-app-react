import React, { Component } from 'React'
import { AsyncStorage, View } from 'react-native'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class Splash extends Component {
    constructor(props) {
        super(props)
        //this.isLogged()
        this.props.navigation.navigate('App');
    }

    render() {
        return (
            <View></View>
        )
    }

    getItem = async (key) => {
        var value = await AsyncStorage.getItem(key)
        return value
    }

    isLogged = () => {
        this.getItem('ACCESS_TOKEN').then(value => {
            if (value == null) {
                this.props.navigation.navigate('Auth');
            } else {
                this.props.navigation.navigate('App');
            }
        });
    }
}