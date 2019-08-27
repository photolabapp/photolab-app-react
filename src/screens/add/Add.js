import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/FontAwesome';


export default class Add extends Component {

    constructor(props) {
        super(props);
        //ssthis.upload()
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
                <Icon name='add-box' size={50} color='#000000' />
                <Iconn name="home" size={18} color="#999" />
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
        backgroundColor: '#D2D2D2'
    }
})