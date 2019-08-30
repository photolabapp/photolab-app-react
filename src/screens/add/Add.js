import React, { Component } from 'react'
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPhoto } from '../../store/AlbumAction'
import ImagePicker from 'react-native-image-picker'
import { withNavigationFocus } from 'react-navigation'

class Add extends Component {

    constructor(props) {
        super(props);
        console.log("SDSDSSDDSD constructor")
    }

    componentDidUpdate(prevProps) {
        console.log("SDSDSSDDSD " + prevProps.isFocused + " " + this.props.isFocused)
        if (this.props.isFocused) {
            this.upload()
        }
    }

    componentDidMount() {
        console.log("SDSDSSDDSD MONTED")
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Album')
        return true;
    }

    /*
    updateAlbum = (photo) => {
        return {
            type: "ALBUM_UPDATE",
            payload: { uri: photo.uri }
        }
    }
    */

    upload = () => {
        ImagePicker.launchImageLibrary({
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }, (response) => {
            console.log("Fotoooooo " + response)
            this.handleBackPress()
            //this.updateAlbum(response)
            this.props.addPhoto(response)
            // Same code as in above section!
        });
    }

    render() {
        return (
            <View />
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ addPhoto }, dispatch)
);

export default connect(album => ({ album: album.album }), mapDispatchToProps)(withNavigationFocus(Add))