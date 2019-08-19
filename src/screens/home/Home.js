import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';


export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View styles={styles.container}>
                <Text>
                    TESTE
                </Text>
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
    }
})