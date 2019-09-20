import React, { Component } from 'react'
import MovieDecoration from './components/MovieDecoration'
import { shipping } from '../../services/Api'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import EditText from '../../components/EditText'
import Carousel from 'react-native-snap-carousel'

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current: 1,
            total: 0,
            value: 20.0,
            cep: "",
            shipping: null
        }
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);
    width = 50
    height = 65

    shipping = (cep) => {
        if (cep.length == 8) {
            shipping(cep)
                .then(response => this.setState(response))
                .catch(error => console.log("shipping error " + error));
        }
    }

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
                    zoomScale={0}
                    itemWidth={this.width}
                    sliderWidth={this.screenWidth}
                    itemHeight={this.height}
                    renderItem={this.renderItem} />

                <View style={styles.cardViewContainer}>
                    <Text style={styles.shippingHeader}>Resumo do pedido</Text>
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
                    <EditText
                        placeholder="cep:"
                        keyboardType="numeric"
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Normal (até 6 dias úteis)*</Text>
                        <Text style={styles.buyDescText}>R$ --</Text>
                    </View>
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Retirar na loja (1 dia útil)</Text>
                        <Text style={styles.buyDescText}>Grátis</Text>
                    </View>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.button]}>
                    <Text style={{ color: '#FFF' }}>FINALIZAR COMPRA</Text>
                </TouchableHighlight>

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
        elevation: 2
    },
    buyInfo: {
        paddingStart: 24,
        paddingEnd: 24,
        marginBottom: 3,
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
    },
    buttonContainer: {
        height: 45,
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
})

const mapStateToProps = state => {
    return { album: state.album }
}

/*
const mapStateToProps = state => {
    const { album, user } = state
    return { album, user }
}
*/

export default connect(mapStateToProps)(Cart)