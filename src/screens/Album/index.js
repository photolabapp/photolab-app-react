import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePhoto, updateQuantity, updateFormat, removePhoto } from '../../store/AlbumAction'
import { bindActionCreators } from 'redux'
import { View, Dimensions, ImageBackground, TouchableOpacity, FlatList, Text, Alert } from 'react-native'
import styles from './styles'
import { Picker } from '@react-native-community/picker'
import { PlabButton } from '../../components'
import Carousel from 'react-native-snap-carousel'
import ImagePicker from 'react-native-image-crop-picker'
import { TabView } from 'react-native-tab-view';

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
    width = 213
    height = 320

    cropPhoto = (index) => {
        let photo = this.props.order.album[index]
        ImagePicker.openCropper({
            width: 640,
            height: 960,
            path: photo.raw,
            mediaType: 'photo'
        }).then(image => this.props.updatePhoto({ uri: image.path }, index))
        .catch(err => console.log("crop error " + err))
    }

    dialogRemovePhoto = (index) => { this.firstRoute
        Alert.alert(
            'Remover Foto',
            'Tem certeza que deseja remover foto?',
            [
                { text: 'Cancelar', style: 'cancel', },
                { text: 'Sim', onPress: () => this.removePhoto(index) },
            ],
            { cancelable: true },
        );
    }

    removePhoto = (index) => {
        this.props.removePhoto(index)
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
                <TouchableOpacity
                    onPress={() => this.cropPhoto(index)}
                    onLongPress={() => this.dialogRemovePhoto(index)}>
                    <ImageBackground
                        style={{
                            width: this.width,
                            height: this.height,
                            borderColor: '#D2D2D2',
                            elevation: this.props.order.album.length - index
                        }}
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
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.pickerTitle}>Formato: </Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={this.state.format}
                            mode="dropdown"
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ format: itemValue })
                                this.props.updateFormat(itemValue, this.currentIndex)
                            }}>
                            <Picker.Item label="10x15" value="10x15" />
                            <Picker.Item label="15x20" value="15x20" />
                        </Picker>
                    </View>

                    <Text style={[styles.pickerTitle, { marginStart: 4 }]}>Quantidade: </Text>
                    <View style={[styles.pickerContainer, { width: 80 }]}>
                        <Picker
                            selectedValue={this.state.quantity}
                            mode="dropdown"
                            style={styles.picker}
                            textStyle={{ fontSize: 12 }}
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

            <PlabButton
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

            <PlabButton
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



const mapDispatchToProps = dispatch => (
    bindActionCreators({ updatePhoto, updateFormat, updateQuantity, removePhoto }, dispatch)
)

const mapStateToProps = state => {
    return {
        order: state.order,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)