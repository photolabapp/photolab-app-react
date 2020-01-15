import React, { Component } from 'react'
import { View, BackHandler, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPhoto } from '../../store/AlbumAction'
import ImagePicker from 'react-native-image-crop-picker'
import { withNavigationFocus } from 'react-navigation'
import ImageEditor from '@react-native-community/image-editor'

class Upload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            animating: false
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.focusHandler = this.props.navigation.addListener('didFocus', () => this.uploadPicker())
    }

    componentWillUnmount() {
        this.backHandler.remove()
        this.focusHandler.remove()
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Album')
        return true;
    }

    uploadPicker = () => {
        this.setState({ animating: true })

        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            for (i = 0; i < images.length; i++) {
                console.log("RESOLUTION ALTURA " + images[i].height + " LARGURA " + images[i].width)
                cropData = {
                    offset: { x: 0, y: 0 },
                    size: { width: images[i].width, height: images[i].height },
                    displaySize: { width: 853.33, height: 1280 },
                    resizeMode: 'contain',
                };

                var photo = images[i]
                console.log("LSDKLSDKLS photo raw " + photo.path)
                ImageEditor.cropImage(photo.path, cropData).then(crop => {
                    console.log("LSDKLSDKLS photo cropped " + crop)
                    this.props.addPhoto(photo.path, crop)
                })

                if (i == (images.length - 1)) {
                    this.handleBackPress()
                }
            }
            this.setState({ animating: false })
        }).catch(err => {
            this.setState({ animating: false })
            this.handleBackPress()
        });
    }

    render() {
        return (
            <View style={styles.container} >
                <ActivityIndicator style={{ position: "absolute" }} size="large" animating={this.state.animating} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ addPhoto }, dispatch)
)

export default connect(state => ({ order: state.order }), mapDispatchToProps)(withNavigationFocus(Upload))