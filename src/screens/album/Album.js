import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePhoto } from '../../store/AlbumAction'
import { bindActionCreators } from 'redux'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import ImagePicker from 'react-native-image-crop-picker'
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

class Album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 1,
            total: 0,
            value: 20.0,
            index: 0,
            routes: [
                { key: 'first', title: 'First' },
                { key: 'second', title: 'Second' },
            ],
        }
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);
    width = this.screenWidth / 1.2
    height = this.screenHeight / 1.8

    cropImage = (index) => {
        let photo = this.props.album.album[index]
        ImagePicker.openCropper({
            path: photo.raw,
            width: 300,
            height: 400
        }).then(image => {
            this.props.updatePhoto({ uri: image.path }, index)
        }).catch((err) => {
            console.log("SDSDSDSDSD crop error " + err)
        });
    }

    renderItem = ({ item, index }) => {
        const { cropped } = item
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
                        source={{ uri: cropped }}>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }

    /*
    render() {
        return (
            <View style={styles.container}>
                <Carousel
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
    */
    render() {
        return (
            <TabView
                style={{ paddingTop: 55 }}
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    } F
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
    scene: {
        flex: 1,
    },
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updatePhoto }, dispatch)
)

const mapStateToProps = album => {
    console.log("SDSDDSD CALLL mapStateToProps");
    return {
        album: album.album
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)