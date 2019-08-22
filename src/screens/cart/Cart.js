import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-picker'


export default class Cart extends Component {

    constructor(props) {
        super(props);
    }

    upload = () => {
        ImagePicker.launchImageLibrary({
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }, (response) => {
            // Same code as in above section!
        });
    }

    render() {
        return (
            <View styles={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dfdfdf'
    },
    buttonText: {
        color: "white"
    },
    button: {
        height: 45,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 250,
        backgroundColor: "#00b5ec",
    }
})