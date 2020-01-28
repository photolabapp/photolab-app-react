import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { PlabCardView } from '../../../components'
import { DetailOrderCardView } from '../components/DetailOrderCardView'
import styles from './styles'
import { getShippingAddress } from '../../../services/Api'

const CartShipping = props => {
    const orderAmount = 123.3

    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(orderAmount)
    const [shippingType, setShippingType] = useState(null)
    const [shippingDeadLine, setShippingDeadLine] = useState(null)
    const [data, setData] = useState(null)
    const [order, setOrder] = useState(null)

    const mockOrder = {
        status: "DRAWN",
        album: [{ price: 23.00, format: "10x15", quantity: 5 }, { price: 23.00, format: "10x15", quantity: 2 }]
    }

    useEffect(() => {
        console.log("SLDLSKDLSDK CALL")
        setLoading(true)
        setOrder(mockOrder)

        const getData = () => {
            getShippingAddress({ id: 1 }).then(response => {
                console.log("SLDLSKDLSDK CALL response " + JSON.stringify(response.data))
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
        const newOrder = { ...order }
        newOrder.shipping = item
        setOrder(newOrder)

        const newData = [...data]
        newData.forEach(shipping => {
            newData.selected = (shipping.id === item.id)
        })

        setData(newData)
        setTotal(orderAmount + item.price)
        setShippingType(item.type)
        setShippingDeadLine(item.deadLine)
    }

    const addAddress = () => {
        this.props.navigation.navigate('CreateAddress')
    }

    const render = () => {
        if (loading) {
            return (<ActivityIndicator size="large" animating={loading} />)
        } else {
            return (
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
                                        <View style={{ width: "3%", backgroundColor: (shipping.selected) ? '#535f69' : '#FFF' }} />
                                        <View style={{ width: "97%" }}>
                                            <View style={styles.buyInfo}>
                                                <Text style={styles.buyDescText}>{shipping.type}</Text>
                                            </View>
                                            {(shipping.recipient !== null) ?
                                                <View style={styles.buyInfo}>
                                                    <Text style={styles.buyDescText}>{shipping.recipient}</Text>
                                                </View>
                                                : null}
                                            <View style={styles.buyInfo}>
                                                <Text style={styles.buyDescText}>
                                                    {shipping.address}
                                                    {(shipping.complement !== null) ? " " + shipping.complement : null}
                                                </Text>
                                            </View>
                                            <View style={styles.buyInfo}>
                                                <Text style={styles.buyDescText}>{shipping.city + " - " + shipping.state}</Text>
                                            </View>
                                            <View style={styles.buyInfo}>
                                                <Text style={styles.buyDescText}>{shipping.cep}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </PlabCardView>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView >
            )
        }
    }

    return (
        render()
    )
}

export default CartShipping