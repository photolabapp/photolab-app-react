import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-picker'


export default class Home extends Component {

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
                <TouchableHighlight onPress={() => this.upload()}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#969696'
    },
    buttonText: {
        color: "black"
    },
})