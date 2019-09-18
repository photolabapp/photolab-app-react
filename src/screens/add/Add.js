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
    }

    componentDidUpdate(prevProps) {
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
            this.handleBackPress()
            this.props.addPhoto(response)
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