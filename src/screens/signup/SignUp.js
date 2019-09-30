import React, { Component } from 'react'
import { create } from '../../services/Api'
import validate from './Validate'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUser } from '../../store/UserAction'
import { StyleSheet, View, Image, Alert } from 'react-native'
import { Button, TextInput } from '../../components/UIKit'

class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            cellPhone: '',
            error: new Map()
        }
    }

    save = () => {
        user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cellPhone: this.state.cellPhone
        }

        let error = validate(user)
        if (error.size > 0) {
            this.setState({ error: error })
        } else {
            create(user).then(response => {
                this.props.updateUser(response)
                this.setToken(response.data.accessToken)
                this.props.navigation.navigate('App')

                Alert.alert("Cadastro", "Cadastro efetuado com sucesso!!!!")
            }).catch(error => console.log(error));
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
                    style={{ width: 150, height: 30, marginBottom: 48 }} />

                <View style={{ marginBottom: 32, width: "100%" }} >
                    <TextInput
                        placeholder="nome"
                        errorMessage={this.state.error.get("name")}
                        onChangeText={(name) => this.setState({ name })} />
                </View>

                <View style={{ marginBottom: 32, width: "100%" }} >
                    <TextInput
                        placeholder="e-mail"
                        keyboardType="email-address"
                        errorMessage={this.state.error.get("email")}
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={{ marginBottom: 32, width: "100%" }} >
                    <TextInput
                        placeholder="celular"
                        keyboardType="phone-pad"
                        size="11"
                        errorMessage={this.state.error.get("cellPhone")}
                        onChangeText={(cellPhone) => this.setState({ cellPhone })} />
                </View>
            
                <View style={{ marginBottom: 40, width: "100%" }} >
                    <TextInput
                        placeholder="senha"
                        secureTextEntry={true}
                        errorMessage={this.state.error.get("password")}
                        onChangeText={(password) => this.setState({ password })} />
                </View>
            
                <View style={{ marginBottom: 32, width: "100%" }} >
                    <Button text="Salvar" onPress={() => this.save()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingStart: 24,
        paddingEnd: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#31383E',
    }
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUser }, dispatch)
)

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)