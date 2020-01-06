import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { connect } from 'react-redux'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

class Splash extends Component {
    constructor(props) {
        super(props)
        this.isLogged()
    }

    componentWillMount(){
        //this.isLogged()
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
        console.log("LSKLKDLSKDSLDKS " + this.props.user.name)
        if (typeof this.props.user.id === 'undefined') {
            this.props.navigation.navigate('Auth')
        } else {
            this.props.navigation.navigate('App')
        }
        /*
        this.getItem('ACCESS_TOKEN').then(value => {
            if (value == null) {
                this.props.navigation.navigate('Auth');
            } else {
                this.props.navigation.navigate('App');
            }
        }).catch((error) => console.log("Error " + err));
        */
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}

export default connect(mapStateToProps)(Splash)