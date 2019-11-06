import React, { Component } from 'react';
import { login } from '../../services/Api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUser } from '../../store/UserAction'
import { StyleSheet, View, Image, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button } from '../../components/UIKit'
import validate from './Validate'
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            indicator: false,
            error: new Map()
        }
    }

    login = () => {
        this.setState({ indicator: true })
        user = {
            email: this.state.email,
            password: this.state.password
        }

        let error = validate(user)
        if (error.size > 0) {
            this.setState({ error: error })
            this.setState({ indicator: false })
        } else {
            login(user).then(response => {
                console.log("LSKLKDLSKDSLDKS user " + response.data.user)
                this.props.updateUser(response.data.user)
                //this.setToken(response.data.accessToken)
                this.props.navigation.navigate('App')
                this.setState({ indicator: false })
                console.log(response)
            }).catch(error => { 
                console.log("Login error " + error)
                this.setState({ indicator: false })
                Alert.alert("Cadastro", "Erro no cadastro, tente novamamente!!!!")
            })
        }
    }

    /*
    setToken = (token) => {
        _storeData = async () => {
            try {
                await AsyncStorage.setItem('ACCESS_TOKEN', token);
            } catch (error) { console.log("Periste token error " + error) }
        };
    }
    */

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" animating={this.state.indicator} />

                <Image source={{ uri: 'https://www.photolab1.com.br/img/logo-topo.png' }}
                    style={{ width: 150, height: 30, marginBottom: 48 }} />

                <TextInput
                    style={{ width: "100%" }}
                    placeholder="e-mail"
                    keyboardType="email-address"
                    errorMessage={this.state.error.get("email")}
                    onChangeText={(email) => this.setState({ email })} />

                <TextInput
                    style={{ width: "100%" }}
                    placeholder="senha"
                    secureTextEntry={true}
                    errorMessage={this.state.error.get("password")}
                    onChangeText={(password) => this.setState({ password })} />

                <Button
                    style={{ marginBottom: 32, marginTop: 16, width: "100%" }}
                    text="Login" onPress={() => this.login()} />

                <Button
                    style={{ width: "100%" }}
                    text="Não tenho login"
                    onPress={() => this.props.navigation.navigate('SignUp')} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: 24,
        paddingEnd: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#31383E',
    }
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUser }, dispatch)
)

const mapStateToProps = state => {
    return { user: state.user.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)