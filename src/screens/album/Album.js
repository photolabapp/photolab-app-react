import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePhoto, updateQuantity, updateFormat } from '../../store/AlbumAction'
import { bindActionCreators } from 'redux'
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, FlatList, Text } from 'react-native'
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
            format: "10x15",
            index: 0,
            routes: [
                { key: 'first', title: 'Carousel' },
                { key: 'second', title: 'Grid' },
            ],
        }

        console.log("LSKDLSKDLSD " + this.props.order.album)
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);
    width = 180
    height = 270

    cropImage = (index) => {
        let photo = this.props.order.album[index]
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

    currentIndex = 0;
    onSnapItem = (index) => {
        this.currentIndex = index
        this.setState({ format: this.props.order.album[index].format })
        this.setState({ quantity: this.props.order.album[index].quantity })
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
                            elevation: this.props.order.album.length - index
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
                data={this.props.order.album}
                itemWidth={this.width}
                sliderWidth={this.screenWidth}
                itemHeight={this.height}
                onSnapToItem={index => this.onSnapItem(index)}
                renderItem={this.renderItem} />

            {!this.props.order.album || this.props.order.album.length == 0 ? null : (
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.pickerTitle}>Formato: </Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={this.state.format}
                            mode="dropdown"
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => {
                                console.log("LSKDLKDL --- itemValue " + itemValue + " itemIndex " + itemIndex)
                                this.setState({ format: itemValue })
                                this.props.updateFormat(itemValue, this.currentIndex)
                            }}>
                            <Picker.Item label="10 x 15" value="10x15" />
                            <Picker.Item label="20 x 30" value="20x30" />
                        </Picker>
                    </View>
                </View>
            )}

            {!this.props.order.album || this.props.order.album.length == 0 ? null : (
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.pickerTitle}>Quantidade: </Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={this.state.quantity}
                            mode="dropdown"
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ quantity: itemValue })
                                this.props.updateQuantity(itemValue, this.currentIndex)
                            }}>
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
                    </View>
                </View>
            )}

            <Button
                style={{ width: "100%" }}
                text="FINALIZAR COMPRA"
                onPress={() => this.checkout()} />
        </View>
    )

    secondRoute = () => (
        <View style={styles.containerScene}>
            <FlatList
                data={this.props.order.album}
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
    pickerTitle: {
        height: 40,
        width: 90,
        marginEnd: 5,
        textAlign: "right",
        textAlignVertical: 'center',
        color: "#000"
    },
    picker: {
        height: 20,
        width: "95%",
        color: "#000",
    },
    pickerContainer: {
        marginBottom: 10,
        height: 40,
        borderWidth: 2,
        borderColor: '#c2c2c1',
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#d2d2d2",
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
    },
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updatePhoto, updateFormat, updateQuantity }, dispatch)
)

const mapStateToProps = state => {
    return {
        order: state.order,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)