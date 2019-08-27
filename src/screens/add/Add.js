import React, { Component } from 'react'
import { View } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { withNavigationFocus } from "react-navigation";

class Add extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.upload()
        }
    }

    upload = () => {
        ImagePicker.launchImageLibrary({
            title: 'Selecionar Foto',
            customButtons: [{ name: 'adicionar', title: 'Selecione a foto' }],
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
            <View></View>
        )
    }
}

export default withNavigationFocus(Add)