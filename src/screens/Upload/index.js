import React, { Component } from 'react'
import { View, BackHandler, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPhoto } from '../../store/AlbumAction'
import ImagePicker from 'react-native-image-crop-picker'
import { withNavigationFocus } from 'react-navigation'
import { height10x15, width10x15, height15x20, widtht15x20 } from '../../utils/Constrain'
import ImageEditor from '@react-native-community/image-editor'
import RNFS from 'react-native-fs'

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

    cropOptions10x15 = image => {
        const options = {
            offset: { x: 0, y: 0 },
            size: { width: image.width, height: image.height },
            displaySize: { width: width10x15, height: height10x15 },
            resizeMode: 'contain',
        }
        return options
    }

    cropOptions15x20 = image => {
        const options = {
            offset: { x: 0, y: 0 },
            size: { width: image.width, height: image.height },
            displaySize: { width: widtht15x20, height: height15x20 },
            resizeMode: 'contain',
        }
        return options
    }

    uploadPicker = () => {
        this.setState({ animating: true })

        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        }).then(async images => {
            for (i = 0; i < images.length; i++) {

                console.log("PHOOTORKOKTR -------- openPicker " + JSON.stringify(images[i]))

                const crop10x15 = await ImageEditor.cropImage(images[i].path, this.cropOptions10x15(images[i]))
                console.log("PHOOTORKOKTR -------- crop10x15 " + JSON.stringify(crop10x15))
                const crop15x20 = await ImageEditor.cropImage(images[i].path, this.cropOptions15x20(images[i]))
                console.log("PHOOTORKOKTR -------- crop15x20 " + JSON.stringify(crop15x20))

                const extension = images[i].mime.split("/")[1]
                const uriRaw = await this.moveToStorage(images[i].path, extension)
                console.log("PHOOTORKOKTR -------- uriRaw " + JSON.stringify(uriRaw))
                const uri10x15 = await this.moveToStorage(crop10x15, extension)
                console.log("PHOOTORKOKTR -------- uri10x15 " + JSON.stringify(uri10x15))
                const uri15x20 = await this.moveToStorage(crop15x20, extension)
                console.log("PHOOTORKOKTR -------- uri15x20 " + JSON.stringify(uri15x20))

                this.props.addPhoto({
                    raw: "file://" + uriRaw,
                    cropped10x15: "file://" + uri10x15,
                    cropped15x20: "file://" + uri15x20,
                })

                if (i == (images.length - 1)) {
                    this.handleBackPress()
                }
            }
            this.setState({ animating: false })
        }).catch(err => {
            console.log("PHOOTORKOKTR -------- openPicker error " + JSON.stringify(err) + " " + err)
            this.setState({ animating: false })
            this.handleBackPress()
        });
    }

    moveToStorage = async (uri, extension) => {
        console.log("PHOOTORKOKTR ----- move uri " + uri + " extension " + extension)
        try {
            if (Platform.OS == "android") {
                uri = uri.replace("file://", "");
            }
            const newFile = RNFS.PicturesDirectoryPath + "/" + Math.random().toString(20) + "." + extension
            console.log("PHOOTORKOKTR ----- newFile " + newFile)
            _ = await RNFS.copyFile(uri, newFile)

            return newFile
        } catch (err) {
            console.log("PHOOTORKOKTR ----- moveToStorage error " + err)
        }

        return null
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