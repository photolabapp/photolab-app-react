import React, { Component } from 'react'
import { View, BackHandler } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import { withNavigationFocus } from 'react-navigation'

class Add extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        console.log("SDSDSSDDSD " + prevProps.isFocused + " " + this.props.isFocused)
        if (this.props.isFocused) {
            this.upload()
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Album')
        return true;
    }

    upload = () => {
        ImagePicker.launchImageLibrary({
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }, (response) => {
            console.log("Fotoooooo " + response)
            this.handleBackPress()
            // Same code as in above section!
        });
    }

    render() {
        return (
            <View />
        )
    }
}

export default withNavigationFocus(Add)