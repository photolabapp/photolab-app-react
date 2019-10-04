import React, { Component } from 'react'
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native'
import { Input } from 'react-native-elements';

export class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableHighlight
                style={[styles.buttonContainer, styles.button, { ...this.props.style }]}
                onPress={this.props.onPress}>
                <Text style={{ color: '#FFF', fontSize: 16 }}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

export class CardView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.cardViewContainer, { ...this.props.style }]}>
                {this.props.children}
            </View>
        )
    }
}

export class TextInput extends Component {
    constructor(props) {
        super(props)

        this.props.size = 200
        this.props.secureTextEntry = false
    }

    render() {
        return (
            <Input
                inputStyle={[styles.input, {...this.props.style}]}
                containerStyle={{marginBottom: 8}}
                placeholderTextColor="#787d82"
                errorStyle={{ color: 'red' }}
                secureTextEntry={this.props.secureTextEntry}
                placeholder={this.props.placeholder}
                keyboardType={this.props.keyboardType}
                size={this.props.size}
                errorMessage={this.props.errorMessage}
                onChangeText={this.props.onChangeText} />
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    button: {
        backgroundColor: "#00b5ec",
    },
    cardViewContainer: {
        borderRadius: 2,
        backgroundColor: "white",
        elevation: 2
    },
    input: {
        height: 45,
        marginLeft: 16,
        marginRight: 16,
        color: '#FFFFFF',
    }
})