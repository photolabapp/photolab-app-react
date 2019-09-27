import React, { Component } from 'react';
import { login } from '../../services/Api'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';
import TextInput from '../../components/TextInput'
import validate from './Validate'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: new Map()
        }
    }

    login = () => {
        user = {
            email: this.state.email,
            password: this.state.password
        }

        let error = validate(user)
        if (error.size > 0) {
            this.setState({ error: error })
        } else {
            login(user).then(response => {
                this.setToken(response.data.accessToken)
                this.props.navigation.navigate('App')
                console.log(response)
            }).catch(error => console.log("Login error " + error));
        }
    }

    setToken = (token) => {
        _storeData = async () => {
            try {
                await AsyncStorage.setItem('ACCESS_TOKEN', token);
            } catch (error) { console.log("Periste token error " + error) }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'https://www.photolab1.com.br/img/logo-topo.png' }}
                    style={{ width: 150, height: 30, marginBottom: 60 }} />

                <TextInput
                    placeholder="e-mail"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({ email })} />

                <TextInput
                    placeholder="senha"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })} />

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.registerText}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#31383E',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        width: 250,
        height: 45,
        marginBottom: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#000000',
        color: '#31383E',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
    registerText: {
        color: 'white',
    },
    containerError: {
        width: 250,
        marginBottom: 4,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    error: {
        color: "red"
    }
});