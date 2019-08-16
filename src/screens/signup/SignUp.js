import React, { Component } from 'react'
import api from '../../services/Api'
import validate from 'Validate'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native'

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            cellPhone: '',
            error: new Map()
        }
    }

    save = () => {
        
        let error = validate.validate(...this.state)
        if (error.size > 0) {
            this.setState({ error: error })
        } else {
            Alert.alert("Submit", "Success")
        }

        /*
        user = { name: this.state.name, email: this.state.email, password: this.state.password }
        api.createUser(user)
            .then(response => {
                Alert.alert("success", "success");
                console.log(response)
            })
            .catch(error => {
                Alert.alert("error", "error");
                console.log(error)
            });
            */
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'https://www.photolab1.com.br/img/logo-topo.png' }}
                    style={{ width: 150, height: 30, marginBottom: 60 }} />

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="nome:"
                        placeholderTextColor="#787d82"
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({ name })} />
                </View>

                <View style={styles.containerError}>
                    <Text style={styles.error}>
                        {this.state.error.get('name')}
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="email:"
                        placeholderTextColor="#787d82"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.containerError}>
                    <Text style={styles.error}>
                        {this.state.error.get('email')}
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="celular:"
                        placeholderTextColor="#787d82"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(cellPhone) => this.setState({ cellPhone })} />
                </View>

                <View style={styles.containerError}>
                    <Text style={styles.error}>
                        {this.state.error.get('cellPhone')}
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="senha:"
                        placeholderTextColor="#787d82"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <View style={styles.containerError}>
                    <Text style={styles.error}>
                        {this.state.error.get('password')}
                    </Text>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.save()}>
                    <Text style={styles.loginText}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#31383E',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        width: 250,
        height: 45,
        marginBottom: 20,
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
    },
    error: {
        color: 'red'
    }
});