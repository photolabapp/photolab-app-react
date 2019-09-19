import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class EditText extends Component {
    constructor(props) {
        super(props)

        props.placeholderTextColor="#787d82"
        props.underlineColorAndroid='transparent'
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs} {...this.props} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    }
})

