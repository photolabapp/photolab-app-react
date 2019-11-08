import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePhoto } from '../../store/AlbumAction'
import { bindActionCreators } from 'redux'
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { Button } from '../../components/UIKit'
import Carousel from 'react-native-snap-carousel'
import ImagePicker from 'react-native-image-crop-picker'
import { TabView } from 'react-native-tab-view';
import Login from '../login/Login';

class Album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            format: "10x15",
            quantity: 1,
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
        let photo = this.props.order.order.album[index]
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
        this.props.navigation.navigate('Cart')
    }

    renderItem = ({ item, index }) => {
        const { cropped, quantity, format } = item
        this.setState({ format: format })
        this.setState({ quantity: quantity })
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
                            elevation: this.props.order.order.album.length - index
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
                data={this.props.order.order.album}
                itemWidth={this.width}
                sliderWidth={this.screenWidth}
                itemHeight={this.height}
                renderItem={this.renderItem} />

            <Picker
                selectedValue={this.state.format}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ format: itemValue })
                }>
                <Picker.Item label="10 x 15" value="10x15" />
                <Picker.Item label="20 x 30" value="20x30" />
            </Picker>

            <Picker
                selectedValue={this.state.quantity}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ quantity: itemValue })
                }>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
            </Picker>

            <Button
                style={{ width: "100%" }}
                text="FINALIZAR COMPRA"
                onPress={() => this.checkout()} />
        </View>
    )

    secondRoute = () => (
        <View style={styles.containerScene}>
            <FlatList
                data={this.props.order.order.album}
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

            <Button
                style={{ width: "100%" }}
                text="FINALIZAR COMPRA"
                onPress={() => this.checkout()} />

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
    bindActionCreators({ updatePhoto }, dispatch)
)

const mapStateToProps = state => {
    return {
        order: state.order,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)