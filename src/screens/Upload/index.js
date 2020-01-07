import React, { Component } from 'react'
import { View, BackHandler, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPhoto } from '../../store/AlbumAction'
import ImagePicker from 'react-native-image-crop-picker'
import { withNavigationFocus } from 'react-navigation'

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
                this.props.addPhoto(images[i].path)
                if (i == (images.length - 1)) {
                    this.handleBackPress()
                }
            }
            this.setState({ animating: false })
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