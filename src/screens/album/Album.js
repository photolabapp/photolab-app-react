import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePhoto } from '../../store/AlbumAction'
import { updateOrder } from '../../store/OrderAction'
import { bindActionCreators } from 'redux'
import {
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { createOrder, getOrder, getLastOrderCreated } from '../../services/Api'
import { Button } from '../../components/UIKit'
import Carousel from 'react-native-snap-carousel'
import ImagePicker from 'react-native-image-crop-picker'
import { TabView } from 'react-native-tab-view';

class Album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 1,
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
            console.log("crop error " + err)
        });
    }

    checkout = () => {
        getLastOrderCreated(1).then(response => {
            this.props.updateOrder(response)
            this.props.navigation.navigate('Cart')

        }).catch(error => {
            if (error.response && error.response.status == 402) {
                
                createOrder.then(response => {
                    this.props.updateOrder(response)
                    this.props.navigation.navigate('Cart')
                
                }).catch(error => console.log("Create order error " + error))
            }
            console.log("Get order error " + error)
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

    firstRoute = () => (
        <View style={styles.containerScene}>
            <Carousel
                data={this.props.album.album}
                itemWidth={this.width}
                sliderWidth={this.screenWidth}
                itemHeight={this.height}
                renderItem={this.renderItem} />

            <View style={{ marginTop: 10 }}>
                <Button text="FINALIZAR COMPRA" onPress={() => this.checkout()} />
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
                <Button text="FINALIZAR COMPRA" onPress={() => this.checkout()} />
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
    scene: {
        flex: 1,
        flexDirection: "column",
    },
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updatePhoto, updateOrder }, dispatch)
)

const mapStateToProps = album => {
    return { album: album.album }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)