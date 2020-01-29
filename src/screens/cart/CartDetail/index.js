import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from 'react-navigation-hooks'
import { MovieDecoration } from '../components/MovieDecoration'
import { getLastOrderCreated, createOrder } from '../../../services/Api'
import { updateOrder } from '../../../store/OrderAction'
import { Text, View, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { PlabCardView, PlabButton } from '../../../components'
import DetailOrderCardView from '../components/DetailOrderCardView'
import Carousel from 'react-native-snap-carousel'
//import Upload from 'react-native-background-upload'
import styles from './styles'

const CartDetail = () => {

    const [quantity, setQuantity] = useState(null)
    const [format, setFormat] = useState(null)
    const [total, setTotal] = useState(null)
    const [loading, setLoading] = useState(true)

    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    
    const { navigate } = useNavigation();

    useEffect(() => {
        const order = () => {
            getLastOrderCreated(user, order).then(response => {
                dispatch(updateOrder({ ...response.data, album: order.album }))
                setLoading(false)
            }).catch(error => {
                if (error.response && error.response.status == 412) {
                    createOrder(this.props.user).then(response => {
                        dispatch(updateOrder({ ...response.data, album: order.album }))
                        setLoading(false)
                    }).catch(error => {
                        setLoading(false)
                        console.log("Create order error " + error)
                    })
                }
                setLoading(false)
                console.log("Get order error " + error)
            });

            this.props.updateOrder(order)
        }
        order()

        setFormat(order.album[0].format)
        setQuantity(order.album[0].quantity)
        setTotal(order.album[0].quantity * 23.3)
    }, [])

    const next = () => {
        navigate('CartShipping')
    }

    const onSnapItem = (index) => {
        setFormat(order.album[index].format)
        setQuantity(order.album[index].quantity)
        setTotal(order.album[index].quantity * 23.3)
    }

    const renderItem = ({ item, index }) => {
        const { cropped } = item
        return (
            <View style={{ marginTop: 16 }}>
                <MovieDecoration />
                <ImageBackground
                    style={{ width: width, height: height, backgroundColor: "black" }}
                    source={{ uri: cropped }}>
                </ImageBackground>
                <MovieDecoration />
            </View>
        )
    }

    return (
        (loading) ?
            <ActivityIndicator style={{ position: "absolute" }} size="large" animating={true} />
            :
            <View styles={styles.container}>
                <Carousel
                    style={{ marginTop: 32 }}
                    data={order.album}
                    layout="default"
                    zoomScale={0}
                    itemWidth={width}
                    sliderWidth={screenWidth}
                    itemHeight={height}
                    onSnapToItem={onSnapItem}
                    renderItem={renderItem} />
                <DetailOrderCardView order={order} />
                <PlabCardView style={{ marginStart: 16, marginEnd: 16, marginTop: 24 }}>
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyInfoTitle}>Quantidade de fotos:</Text>
                        <Text style={styles.buyInfoDesc}>{quantity}</Text>
                    </View>
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyInfoTitle}>Formato das fotos:</Text>
                        <Text style={styles.buyInfoDesc}>{format}</Text>
                    </View>
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyInfoTitle}>Valor por foto:</Text>
                        <Text style={styles.buyInfoDesc}>{total}</Text>
                    </View>
                </PlabCardView>
                <PlabButton
                    style={{ width: "100%", position: "absolute", top: (screenHeight - 40) - 129 }}
                    text="CONTINUAR"
                    onPress={() => next()} />
            </View>
    )
}

export default CartDetail

/*
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
            url: "http://ec2-54-173-117-10.compute-1.amazonaws.com:8080/photo",
            //url: "http://192.168.0.7:8080/photo",
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
            Upload.addListener('progress', uploadId, data => {
                console.log(`LSKDLS -- Progress: ${data.progress}%`)
            })
            Upload.addListener('error', uploadId, data => {
                console.log(`LSKDLS -- upload album Error: ${data.error}`)
            })
            Upload.addListener('cancelled', uploadId, data => {
                console.log(`LSKDLS -- Cancelled!`)
            })
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

                    {
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Quantidade de fotos:</Text>
                        <Text style={styles.buyDescText}>{this.state.quantity}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Formato da foto:</Text>
                        <Text style={styles.buyDescText}>{this.state.format}</Text>
                    </View>
                   }

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
*/
