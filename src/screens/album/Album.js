import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePhoto } from '../../store/AlbumAction'
import { bindActionCreators } from 'redux';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-crop-picker'

class Album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 1,
            total: 0,
            value: 20.0,
        }
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);
    width = this.screenWidth / 1.2
    height = this.screenHeight / 1.8

    _currentItem = {}

    cropImage = (index) => {
        console.log("SDSDSDSD ----- LOG --- click cropppppppp " + index)
        let photo = this.props.album.album[index]
        ImagePicker.openCropper({
            path: photo.uri,
            width: 300,
            height: 400
        }).then(image => {
            console.log("SDSDSDSD ----- LOG --- click image cropped" + image.path);
            this.props.updatePhoto({ uri: image.path }, index)
        });
    }

    onSnapToItem = (index) => {
        _currentItem = this.props.album.album[index]
        console.log("SDSDSDSD ----- LOG --- call index " + index)
        console.log("SDSDSDSD ----- LOG --- call crop " + this._currentItem.uri)
    }

    //TODO - Adicionar uma moldura cinza nas fotos
    renderItem = ({ item, index }) => {
        const { uri } = item
        return (
            <View>
                <TouchableOpacity onPress={() => this.cropImage(index)}>
                    <ImageBackground
                        style={{
                            width: this.width,
                            height: this.height,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#D2D2D2',
                            elevation: this.props.album.album.length - index
                        }}
                        imageStyle={{ borderRadius: 20 }}
                        source={{ uri: uri }}>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    //onSnapToItem={this.onSnapToItem}
                    data={this.props.album.album}
                    itemWidth={this.width}
                    sliderWidth={this.screenWidth}
                    itemHeight={this.height}
                    renderItem={this.renderItem} />

                <Text style={styles.info}>Quantidade: {this.props.album.album.length} fotos</Text>
                <Text style={styles.info}>Valor Total: R$ {this.props.album.album.length * this.state.value}</Text>
                <TouchableHighlight style={[styles.buttonContainer, styles.button]} >
                    <Text style={{ color: '#FFF' }}>FINALIZAR COMPRA</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 55,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2',
    },
    info: {
        color: '#000',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 250,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 4
    },
    button: {
        backgroundColor: "#00b5ec",
    },
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updatePhoto }, dispatch)
);

export default connect(album => ({ album: album.album }), mapDispatchToProps)(Album)