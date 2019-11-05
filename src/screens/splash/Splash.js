import React, { Component } from 'React'
import { AsyncStorage, View } from 'react-native'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

class Splash extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.isLogged()
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
        if (this.props.user != null) {
            this.props.navigation.navigate('App')
        } else {
            this.props.navigation.navigate('Auth')
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
    return { user: state.user }
}

export default connect(mapStateToProps)(Splash)