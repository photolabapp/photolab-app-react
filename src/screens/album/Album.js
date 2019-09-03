import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableHighlight
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { ThemeConsumer } from 'react-native-elements';

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

    renderItem = ({ item, index }) => {
        //this.setState({ current: index + 1 })

        const { uri } = item
        return (
            <View>
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
                    source={{ uri: uri }} >
                </ImageBackground>
            </View>
        )
    }

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
                <TouchableHighlight style={[styles.buttonContainer, styles.button]} onPress={() => this.login()}>
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

export default connect(album => ({ album: album.album }))(Album)