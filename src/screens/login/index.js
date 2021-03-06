import React, { Component } from 'react';
import { login } from '../../services/Api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUser } from '../../store/UserAction'
import { View, Image, ActivityIndicator, Alert } from 'react-native';
import { PlabTextInput, PlabButton } from '../../components'
import validate from './validate'
import styles from './styles'
import { createStackNavigator, createAppContainer } from 'react-navigation';

import logo from '../../assets/logophotolab.png';
import { ScrollView } from 'react-native-gesture-handler';

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
                this.props.updateUser(response.data.user)
                this.props.navigation.navigate('App')
                this.setState({ indicator: false })
                console.log(response)
            }).catch(error => {
                console.log("Login error " + error)
                this.setState({ indicator: false })
                Alert.alert("Cadastro", "Erro no login, tente novamamente!!!!")
            })
        }
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <ActivityIndicator size="large" animating={this.state.indicator} />
                    <Image source={logo} style={{ width: 150, height: 30, marginBottom: 48 }} />

                    <View style={{ height: 300, width: '100%' }}>

                        <PlabTextInput
                            style={{ width: "100%", height: 45 }}
                            placeholder="e-mail"
                            keyboardType="email-address"
                            errorMessage={this.state.error.get("email")}
                            onChangeText={(email) => this.setState({ email })} />

                        <PlabTextInput
                            style={{ width: "100%", heigth: 45 }}
                            placeholder="senha"
                            secureTextEntry={true}
                            errorMessage={this.state.error.get("password")}
                            onChangeText={(password) => this.setState({ password })} />

                        <PlabButton
                            style={{ marginBottom: 32, marginTop: 16, width: "100%" }}
                            text="Login" onPress={() => this.login()} />

                        <PlabButton
                            style={{ width: "100%" }}
                            text="Não tenho login"
                            onPress={() => this.props.navigation.navigate('SignUp')} />

                    </View>
                </View>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUser }, dispatch)
)

const mapStateToProps = state => {
    return { user: state.user.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)