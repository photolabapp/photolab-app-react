import React, { Component } from 'react'
import MovieDecoration from './components/MovieDecoration'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground
} from 'react-native';
import Carousel from 'react-native-snap-carousel'

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current: 1,
            total: 0,
            value: 20.0,
        }
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);
    width = 50
    height = 75

    //transform: [{ rotate: '90deg'}]
    renderItem = ({ item, index }) => {
        const { cropped } = item
        return (
            <View style={{ marginTop: 16 }}>
                <MovieDecoration />
                <ImageBackground
                    style={{
                        width: this.width,
                        height: this.height,
                        backgroundColor: "black",
                        paddingStart: 2,
                        paddingEnd: 2
                    }}
                    source={{ uri: cropped }}>
                </ImageBackground>
                <MovieDecoration />
            </View>
        )
    }

    render() {
        return (
            <View styles={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Sacola de Compra</Text>
                </View>

                <Carousel
                    data={this.props.album.album}
                    layout="default"
                    itemWidth={this.width}
                    sliderWidth={this.screenWidth}
                    itemHeight={this.height}
                    renderItem={this.renderItem} />

                <View style={styles.cardViewContainer}>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Quantidade de fotos:</Text>
                        <Text style={styles.buyDescText}>{this.props.album.album.length}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor da foto:</Text>
                        <Text style={styles.buyDescText}>R$ {this.state.value}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor total das fotos:</Text>
                        <Text style={styles.buyDescText}> R$ {this.state.value * this.props.album.album.length}</Text>
                    </View>

                </View>

                <View style={styles.cardViewContainer}>
                    <Text style={styles.shippingHeader}>Estime seu frete</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        backgroundColor: "#D2D2D2",
        justifyContent: "center",
        alignItems: "center"
    },
    headerTitle: {
        flex: 1,
        flexDirection: "column",
        color: "black",
        fontSize: 18,
        textAlignVertical: "center"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#D2D2D2'
    },
    cardViewContainer: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        backgroundColor: "white",
        elevation: 4
    },
    buyInfo: {
        paddingStart: 24,
        paddingEnd: 24,
        marginBottom: 2,
        marginTop: 2,
        flexDirection: "row",
    },
    buyTitleText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    buyDescText: {
        flex: 1,
        fontSize: 14,
        textAlign: "right",
        color: "black"
    },
    shippingHeader: {
        paddingStart: 16,
        height: 40,
        backgroundColor: "#D2D2D2",
        color: "black",
        textAlignVertical: "center",
        textAlign: "left",
        fontWeight: "bold"
    }
})

const mapStateToProps = album => {
    return { album: album.album }
}

/*
const mapStateToProps = state => {
    const { album, user } = state
    return { album, user }
}
*/

export default connect(mapStateToProps)(Cart)