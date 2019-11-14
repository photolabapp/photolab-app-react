import React, { Component } from 'react'
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPhoto } from '../../store/AlbumAction'
//import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker'
import { withNavigationFocus } from 'react-navigation'

class Add extends Component {

    constructor(props) {
        super(props);
    }

    /*
    componentDidMount(prevProps) {
        
    }
    */

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        console.log("SKSLDKLDKSLDKSLD CALL" + this.props.isFocused)
        if (this.props.isFocused) {
            this.uploadPicker()
        }
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Album')
        return true;
    }

    /*
    upload = () => {
        ImagePicker.launchImageLibrary({
            storageOptions: {
                skipBackup: false,
                path: 'photolab',
                cameraRoll: true
            }
        }, (response) => {
            this.handleBackPress()
            this.props.addPhoto(response)
        });
    }
    */

    uploadPicker = () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            /*
            for (let image in images) {
                console.log("SKSLDKLDKSLDKSLD CALL IMAGES")
                this.props.addPhoto(image.path)
            }
            */

            for (i = 0; i < images.length; i++){
                this.props.addPhoto(images[i].path)
                if (i == (images.length -1)){
                    this.handleBackPress()
                }
            }
            //}
            //this.props.addPhotos(images)
            console.log(images)
            console.log("SKSLDKLDKSLDKSLD BACK")
           
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
)

export default connect(state => ({ order: state.order }), mapDispatchToProps)(withNavigationFocus(Add))