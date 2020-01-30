import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from 'react-navigation-hooks'
import { updateOrder } from '../../../store/OrderAction'
import { View, Text, TouchableHighlight, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { PlabCardView } from '../../../components'
import DetailOrderCardView from '../components/DetailOrderCardView'
import styles from './styles'
import { getShippingAddress } from '../../../services/Api'

const CartShipping = () => {

    const [loading, setLoading] = useState(true)
    //const [selected, setSelected] = useState({ id: -1 })
    const [data, setData] = useState(null)

    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const { navigate } = useNavigation();

    useEffect(() => {
        const getData = () => {
            getShippingAddress({id: 1}).then(response => {
                console.log("SL<DLSDLSD " + JSON.stringify(response.data))
                setData(response.data)
                setLoading(false)
            }).catch(error => {
                setLoading(false)
                Alert.alert("Carrinho", "Error ao obter os endereços")
            });
        }
        getData()
    }, []);

    const updateShipping = item => {
        dispatch(updateOrder({ ...order, shipping: item }))
    }

    const addAddress = () => {
        navigate('CreateAddress')
    }

    const next = () => {
        navigate('CartPayment')
    }

    const render = () => {
        if (loading) {
            return (<ActivityIndicator size="large" animating={loading} />)
        } else {
            return (
                <>
                    <ScrollView>
                        <View styles={styles.container}>
                            <DetailOrderCardView order={order} />

                            <Text style={{ color: 'black', marginBottom: 6, paddingStart: 24 }}>Selecine um tipo de entrega:</Text>
                            {data.map(shipping => (
                                <TouchableOpacity
                                    onPress={() => updateShipping(shipping)}
                                    activeOpacity={1}>
                                    <PlabCardView style={styles.cardViewContainer}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ width: "3%", backgroundColor: (typeof order.shipping !== 'undefined' && shipping.id === order.shipping.id) ? '#535f69' : '#FFF' }} />
                                            <View style={{ width: "97%" }}>
                                                <View style={styles.infoContainer}>
                                                    <Text style={styles.infoDesc}>{shipping.type}</Text>
                                                </View>
                                                {(shipping.recipient !== null) ?
                                                    <View style={styles.infoContainer}>
                                                        <Text style={styles.infoDesc}>{shipping.recipient}</Text>
                                                    </View>
                                                    : null}
                                                <View style={styles.infoContainer}>
                                                    <Text style={styles.infoDesc}>
                                                        {shipping.address + ", " + shipping.number}
                                                        {(typeof shipping.complement !== 'undefined') ? " " + shipping.complement : null}
                                                    </Text>
                                                </View>
                                                <View style={styles.infoContainer}>
                                                    <Text style={styles.infoDesc}>{shipping.city + " - " + shipping.state}</Text>
                                                </View>
                                                <View style={styles.infoContainer}>
                                                    <Text style={styles.infoDesc}>{shipping.cep}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </PlabCardView>
                                </TouchableOpacity>
                            ))}

                            <TouchableHighlight onPress={() => addAddress()}>
                                <Text style={{ color: '#000', fontSize: 14, marginStart: 16, paddingTop: 8, paddingBottom: 8, marginBottom: 50, textAlign: "center" }}>click aqui para adicionar novo endereço</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView >

                    <PlabButton
                        style={{ width: "100%", position: "absolute", bottom: 0 }}
                        text="CONTINUAR"
                        onPress={() => next()} />
                </>
            )
        }
    }

    return (
        render()
    )
}

export default CartShipping