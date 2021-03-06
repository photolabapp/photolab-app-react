import React, { Component } from 'react'
import { create } from '../../services/Api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUser } from '../../store/UserAction'
import { View, Image, Alert, ActivityIndicator } from 'react-native'
import styles from './styles'
import validate from './validate'
import { PlabButton, PlabTextInput } from '../../components'

import logo from '../../assets/logophotolab.png';
import { ScrollView } from 'react-native-gesture-handler'

class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            indicator: false,
            name: '',
            email: '',
            password: '',
            cellPhone: '',
            error: new Map()
        }
    }

    save = () => {
        this.setState({ indicator: true })
        user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cellPhone: this.state.cellPhone
        }

        let error = validate(user)
        if (error.size > 0) {
            this.setState({ error: error })
            this.setState({ indicator: false })
        } else {
            create(user).then(response => {
                this.props.updateUser(response.data.user)
                this.setToken(response.data.accessToken)
                this.props.navigation.navigate('App')
                this.setState({ indicator: false })

                Alert.alert("Cadastro", "Cadastro efetuado com sucesso!!!!")
            }).catch(error => {
                this.setState({ indicator: false })
                if (error.response && error.response.status == 412) {
                    Alert.alert("Cadastro", error.response.data.message)
                } else {
                    Alert.alert("Cadastro", "Erro no cadastro, tente novamamente!!!!")
                }
                console.log(error)
            });
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
                <ActivityIndicator size="large" animating={this.state.indicator} />

                <Image source={logo} style={{ width: 150, height: 30, marginBottom: 48 }} />

                <PlabTextInput
                    style={{ width: "100%" }}
                    placeholder="nome"
                    errorMessage={this.state.error.get("name")}
                    onChangeText={(name) => this.setState({ name })} />

                <PlabTextInput
                    style={{ width: "100%" }}
                    placeholder="e-mail"
                    keyboardType="email-address"
                    errorMessage={this.state.error.get("email")}
                    onChangeText={(email) => this.setState({ email })} />

                <PlabTextInput
                    style={{ width: "100%" }}
                    placeholder="celular"
                    keyboardType="phone-pad"
                    size="11"
                    errorMessage={this.state.error.get("cellPhone")}
                    onChangeText={(cellPhone) => this.setState({ cellPhone })} />

                <PlabTextInput
                    style={{ width: "100%" }}
                    placeholder="senha"
                    secureTextEntry={true}
                    errorMessage={this.state.error.get("password")}
                    onChangeText={(password) => this.setState({ password })} />

                <PlabButton
                    style={{ marginTop: 16, width: "100%" }}
                    text="Salvar"
                    onPress={() => this.save()} />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUser }, dispatch)
)

const mapStateToProps = state => {
    return { user: state.user.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)