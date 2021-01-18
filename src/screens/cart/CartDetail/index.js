import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigation, useFocusEffect } from 'react-navigation-hooks'
import { MovieDecoration } from '../components/MovieDecoration'
import { getLastOrderCreated } from '../../../services/Api'
import { updateOrder } from '../../../store/OrderAction'
import { Text, View, ImageBackground, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { PlabCardView, PlabButton } from '../../../components'
import { formatAsCurrency } from '../../../utils/Format'
import DetailOrderCardView from '../components/DetailOrderCardView'
import Carousel from 'react-native-snap-carousel'
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
        if (order.album.length > 0) {
            fetchCreateOrder()

            setFormat(order.album[0].format)
            setQuantity(order.album[0].quantity)
            setTotal(order.album[0].quantity * 23.3)
        }
    }, [order.album])

    /*
    useFocusEffect(
        useCallback(() => {
            console.log("CREATEORDERRRRR ------ useFocusEffect")
            fetchCreateOrder()

            setFormat(order.album[0].format)
            setQuantity(order.album[0].quantity)
            setTotal(order.album[0].quantity * 23.3)

            return () => {};
        }, [])
    );
    */

    const fetchCreateOrder = () => {
        console.log("CREATEORDERRRRR CALL " + order.album.length)
        getLastOrderCreated(user).then(response => {
            dispatch(updateOrder({ ...response.data, album: order.album }))
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log("CREATEORDERRRRR Create order error " + error)
        })
    }

    const next = () => {
        navigate('CartShipping')
    }

    const onSnapItem = (index) => {
        setFormat(order.album[index].format)
        setQuantity(order.album[index].quantity)
        setTotal(order.album[index].quantity * 23.3)
    }

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const width = 50
    const height = 65


    const renderItem = ({ item, index }) => {
        const { cropped10x15, cropped15x20, format } = item
        return (
            <View style={{ marginTop: 16 }}>
                <MovieDecoration />
                <ImageBackground
                    style={{ width: width, height: height, backgroundColor: "black" }}
                    source={{ uri: (format === '10x15') ? cropped10x15 : cropped15x20 }}>
                </ImageBackground>
                <MovieDecoration />
            </View>
        )
    }

    return (
        (loading) ?
            <ActivityIndicator style={styles.loading} size="large" animating={true} />
            :
            <>
                <ScrollView>
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
                                <Text style={styles.buyInfoDesc}>R$ {formatAsCurrency(total)}</Text>
                            </View>
                        </PlabCardView>
                        <DetailOrderCardView order={order} />
                    </View>
                </ScrollView>
                <PlabButton
                    style={{ width: "100%", position: "absolute", bottom: 0 }}
                    text="CONTINUAR"
                    onPress={() => next()} />
            </>
    )
}

export default CartDetail