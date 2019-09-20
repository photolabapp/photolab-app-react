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
import { createStackNavigator, createAppContainer } from 'react-navigation';

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

    next = () => {
        this.props.navigation.navigate('CartAddress')
    }

    shipping = (cep) => {
        if (cep.length == 8) {
            this.setState({
                shipping: {
                    city: "São Paulo",
                    values: [{
                        id: 1,
                        desc: "Correios",
                        time: "4 dias úteis",
                        value: 23.50
                    }, {
                        id: 2,
                        desc: "Retidar na loja",
                        time: "1 dia útil",
                        value: 0.0
                    }]
                }
            })
            /*
            shipping(cep)
                .then(response => this.setState(response))
                .catch(error => console.log("shipping error " + error));
                */
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
                        width: width,
                        height: height,
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
                    itemWidth={width}
                    sliderWidth={screenWidth}
                    itemHeight={height}
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
                        onChangeText={(cep) => this.shipping({ cep })}
                    />
                    {this.state.shipping.values.map(value => (
                        <View style={styles.buyInfo}>
                            <Text style={styles.buyTitleText}>{value.desc} ({value.time})*</Text>
                            <Text style={styles.buyDescText}>R$ {value.value}</Text>
                        </View>
                    ))}
                </View>

                <TouchableHighlight 
                    style={[styles.buttonContainer, styles.button]} 
                    onPress={this.next()}>
                    <Text style={{ color: '#FFF' }}>CONTINUAR</Text>
                </TouchableHighlight>

            </View>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const width = 50
const height = 65

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
    cardViewContainer: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        paddingBottom: 4,
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: (screenHeight - 73) - 50,
        position: "absolute"
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