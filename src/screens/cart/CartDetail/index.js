import React, { Component } from 'react'
import { MovieDecoration } from '../components/MovieDecoration'
import { updateOrderToSaved, getLastOrderCreated, createOrder } from '../../../services/Api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateOrder } from '../../../store/OrderAction'
import { StyleSheet, Text, View, Dimensions, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { PlabCardView, PlabButton } from '../../../components'
import Carousel from 'react-native-snap-carousel'
import Upload from 'react-native-background-upload'
import { createStackNavigator, createAppContainer } from 'react-navigation'

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            formart: "",
            indicator: false,
            current: 1,
            total: 0,
            value: 10.0,
            order: null
        }
    }

    componentDidMount() {
        this.focusHandler = this.props.navigation.addListener('didFocus', () => this.order())
        
        if (this.props.order != null && this.props.order.album.length > 0) {
            this.setState({ format: this.props.order.album[0].format })
            this.setState({ quantity: this.props.order.album[0].quantity })
        }
    }

    componentWillUnmount() {
        this.focusHandler.remove()
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
        file = photo.cropped
        if (Platform.OS == "android") {
            file = photo.cropped.replace("file://", "");
        }

        Upload.startUpload({
            //url: "http://ec2-54-173-117-10.compute-1.amazonaws.com:8080/photo",
            url: "http://192.168.0.7:8080/photo",
            path: file,
            method: 'POST',
            field: 'photo',
            type: 'multipart',
            parameters: {
                user: "" + this.props.user.id,
                order: "" + this.state.order.id,
                format: photo.format,
                quantity: "" + photo.quantity
            },
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
                console.log(`LSKDLS -- upload album Error: ${data.error}`)
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
            console.log('Upload error ', err)
        })
    }

    save = () => {
        this.setState({ indicator: true })
        updateOrderToSaved(this.props.user, this.state.order).then(response => {
            this.props.order.album.map(photo => {
                this.uploadPhoto(photo)
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

    onSnapItem = (index) => {
        this.setState({ format: this.props.order.album[index].format })
        this.setState({ quantity: this.props.order.album[index].quantity })
    }

    render() {
        return this.props.order != null && this.props.order.album.length ?
            <View styles={styles.container}>
                
                <Carousel
                    style={{ marginTop: 32 }}
                    data={this.props.order.album}
                    layout="default"
                    zoomScale={0}
                    itemWidth={width}
                    sliderWidth={screenWidth}
                    itemHeight={height}
                    onSnapToItem={index => this.onSnapItem(index)}
                    renderItem={this.renderItem} />

                <PlabCardView style={{ marginStart: 16, marginEnd: 16, marginTop: 24 }}>
                    <Text style={styles.shippingHeader}>Resumo do pedido</Text>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Quantidade da foto:</Text>
                        <Text style={styles.buyDescText}>{this.state.quantity}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Formato da foto:</Text>
                        <Text style={styles.buyDescText}>{this.state.format}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor da foto:</Text>
                        <Text style={styles.buyDescText}>R$ {this.state.value}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Quantidade de fotos:</Text>
                        <Text style={styles.buyDescText}>{this.props.order.album.length}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor total das fotos:</Text>
                        <Text style={styles.buyDescText}> R$ {this.state.value * this.props.order.album.length}</Text>
                    </View>
                </PlabCardView>

                <PlabButton
                    style={{ width: "100%", position: "absolute", top: (screenHeight - 40) - 129 }}
                    text="CONTINUAR"
                    onPress={() => this.save()} />
                
            </View>
            : <ActivityIndicator style={{ position: "absolute" }} size="large" animating={this.state.indicator} />
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
        backgroundColor: '#000000'
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
        order: state.order,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

