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
                style={[styles.buttonContainer, styles.button, { top: this.props.top }]}
                {...this.props}>
                <Text style={{ color: '#FFF', fontSize: 20 }}>{this.props.text}</Text>
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
    }

    render() {
        return (
            < Input
                style={styles.input}
                placeholderTextColor="#787d82"
                errorStyle={{ color: 'red' }}
                {...this.props} />
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
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
        borderBottomColor: '#000000',
        color: '#31383E',
        flex: 1,
    }
})