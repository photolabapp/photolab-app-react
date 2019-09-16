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
    TouchableOpacity,
    FlatList
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import ImagePicker from 'react-native-image-crop-picker'
import { TabView, SceneMap } from 'react-native-tab-view';
import { thisTypeAnnotation } from '@babel/types';

class Album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 1,
            total: 0,
            value: 20.0,
            index: 0,
            routes: [
                { key: 'first', title: 'Carousel' },
                { key: 'second', title: 'Grid' },
            ],
        }
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);
    width = 200
    height = 300

    cropImage = (index) => {
        let photo = this.props.album.album[index]
        ImagePicker.openCropper({
            path: photo.raw,
            width: this.width,
            height: this.height
        }).then(image => {
            this.props.updatePhoto({ uri: image.path }, index)
        }).catch((err) => {
            console.log("SDSDSDSDSD crop error " + err)
        });
    }

    checkout = () => {
        this.props.navigation.navigate('Cart')
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

    firstRoute = () => (
        <View style={styles.containerScene}>
            <Carousel
                data={this.props.album.album}
                itemWidth={this.width}
                sliderWidth={this.screenWidth}
                itemHeight={this.height}
                renderItem={this.renderItem} />

            <View style={{ marginTop: 10 }}>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.button]}
                    onPress={() => this.checkout()} >
                    <Text style={{ color: '#FFF' }}>FINALIZAR COMPRA</Text>
                </TouchableHighlight>
            </View>
        </View>
    )

    secondRoute = () => (
        <View style={styles.containerScene}>
            <FlatList
                data={this.props.album.album}
                numColumns={3}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.imageFlatList}>
                            <TouchableOpacity onPress={() => this.cropImage(index)}>
                                <ImageBackground
                                    style={{ width: 100, height: 150, }}
                                    source={{ uri: item.cropped }}>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <View style={{ marginTop: 10 }}>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.button]}
                    onPress={() => this.checkout()} >
                    <Text style={{ color: '#FFF' }}>FINALIZAR COMPRA</Text>
                </TouchableHighlight>
            </View>
        </View>
    )

    render() {
        return (
            <TabView
                style={{ color: "#D2D2D2" }}
                navigationState={this.state}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case 'first':
                            return this.firstRoute();
                        case 'second':
                            return this.secondRoute();
                        default:
                            return null;
                    }
                }}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
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
    containerScene: {
        paddingTop: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageFlatList: {
        alignItems: "center",
        flexGrow: 1,
        margin: 4,
        padding: 1
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
        marginTop: 10,
        width: 250,
        borderRadius: 5,
        marginBottom: 20,
        elevation: 4
    },
    button: {
        backgroundColor: "#00b5ec",
    },
    scene: {
        flex: 1,
        flexDirection: "column",
    },
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updatePhoto }, dispatch)
)

const mapStateToProps = album => {
    return { album: album.album }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)