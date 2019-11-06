import React, { Component } from 'react'
import MovieDecoration from './components/MovieDecoration'
import { updateOrderToSaved } from '../../services/Api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateOrder } from '../../store/OrderAction'
import { getLastOrderCreated, createOrder } from '../../services/Api'
import { StyleSheet, Text, View, Dimensions, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { CardView, Button, TextInput } from '../../components/UIKit'
import Carousel from 'react-native-snap-carousel'
import Upload from 'react-native-background-upload'
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            indicator: false,
            current: 1,
            total: 0,
            value: 10.0,
            order: null
        }
    }

    componentDidMount() {
        this.order()
    }

    order = () => {
        this.setState({ indicator: true })
        getLastOrderCreated(this.props.user, this.state.order).then(response => {
            this.props.updateOrder(response.data)
            this.setState({ order: response.data })
            this.setState({ indicator: false })

        }).catch(error => {
            if (error.response && error.response.status == 412) {
                createOrder(this.props.user).then(response => {
                    this.props.updateOrder(response.data)
                    this.setState({ order: response.data })
                    this.setState({ indicator: false })

                }).catch(error => {
                    this.setState({ indicator: false })
                    console.log("Create order error " + error)
                })
            }
            console.log("Get order error " + error)
        });
    }

    uploadPhoto = photo => {
        Upload.startUpload({
            url: 'http://ec2-18-234-166-48.compute-1.amazonaws.com:8080/order/photo',
            path: photo,
            method: 'POST',
            field: 'photo',
            type: 'multipart',
            parameters: { user: "" + this.props.user.id, order: "" + this.state.order.id },
            notification: {
                enabled: true,
                autoclear: true,
                onProgressTitle: "Carregando....",
                onProgressMessage: "Enviando foto",
                onCompleteTitle: "Envio finalizado",
                onCompleteMessage: "Foto enviada com sucesso!!"
            }
        }).then(uploadId => {
            /*
            Upload.addListener('progress', uploadId, data => {
                console.log(`LSKDLS -- Progress: ${data.progress}%`)
            })
            /*
            */
            Upload.addListener('error', uploadId, data => {
                console.log(`LSKDLS -- upload album Error: ${data.error}%`)
            })
            /*
            Upload.addListener('cancelled', uploadId, data => {
                console.log(`LSKDLS -- Cancelled!`)
            })
            */
            Upload.addListener('completed', uploadId, data => {
                console.log('LSKDLS -- Completed!')
            })
        }).catch(err => {
            this.setState({ indicator: false })
            console.log('LSKDLS -- Upload error!', err)
        })
    }

    save = () => {
        this.setState({ indicator: true })
        updateOrderToSaved(this.props.user, this.state.order).then(response => {
            this.props.album.map(photo => {
                this.uploadPhoto(photo.cropped)
            })
            this.props.navigation.navigate('CartSuccess')
            this.setState({ indicator: false })
        }).catch(error => {
            console.log("Save order error " + error)
            Alert.alert("Pedido", "Erro ao salvar pedido, tente novamamente!!!!")
            this.setState({ indicator: false })
        });
    }

    next = () => {
        this.props.navigation.navigate('CartAddress')
    }

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
                    }}
                    source={{ uri: cropped }}>
                </ImageBackground>
                <MovieDecoration />
            </View>
        )
    }

    render() {
        return this.state.order != null ?
            <View styles={styles.container}>
                <ActivityIndicator size="large" animating={this.state.indicator} />

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Sacola de Compra</Text>
                </View>

                <Carousel
                    style={{ marginTop: 32 }}
                    data={this.props.album}
                    layout="default"
                    zoomScale={0}
                    itemWidth={width}
                    sliderWidth={screenWidth}
                    itemHeight={height}
                    renderItem={this.renderItem} />

                <CardView style={{ marginStart: 16, marginEnd: 16, marginTop: 24 }}>
                    <Text style={styles.shippingHeader}>Resumo do pedido</Text>
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Quantidade de fotos:</Text>
                        <Text style={styles.buyDescText}>{this.props.album.length}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor da foto:</Text>
                        <Text style={styles.buyDescText}>R$ {this.state.value}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor total das fotos:</Text>
                        <Text style={styles.buyDescText}> R$ {this.state.value * this.props.album.length}</Text>
                    </View>
                </CardView>

                <Button
                    style={{ width: "100%", top: 40 }}
                    text="CONTINUAR"
                    onPress={() => this.save()} />
            </View>
            : null
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
    }
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateOrder }, dispatch)
)

const mapStateToProps = state => {
    return {
        album: state.album.album,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)