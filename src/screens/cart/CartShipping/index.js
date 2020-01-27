import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Text, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native'
import { PlabCardView } from '../../../components'
import styles from './styles'
import { getShippingAddress } from '../../../services/Api'

const CartShipping = props => {
    const orderAmount = 123.3

    const [loading, setLoading] = useState(null)
    const [total, setTotal] = useState(orderAmount)
    const [shippingType, setShippingType] = useState(null)
    const [shippingDeadLine, setShippingDeadLine] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)

        const getData = () => {
            getShippingAddress(user).then(response => {
                setLoading(false)
                setData(response)
            }).catch(error => {
                setLoading(false)
                Alert.alert("Carrinho", "Error ao obter os endereços")
            });
        }
        getData()
    }, []);

    const updateShipping = item => {
        const newData = { ...data }
        newData.forEach(shipping => {
            newData.selected = (shipping.id === item.id)
        })

        setData(newData)
        setTotal(orderAmount + mock[index].price)
        setShippingType(mock[index].title)
        setShippingDeadLine(mock[index].deadLine)
    }

    const addAddress = () => {
        this.props.navigation.navigate('CreateAddress')
    }

    return (
        <ScrollView>
            <View styles={styles.container}>
                <PlabCardView style={styles.cardViewContainerDetail}>
                    <Text style={styles.shippingTitle}>Detalhe do pedido</Text>
                    <View style={styles.infoDetailContainer}>
                        <Text style={styles.buyTitleText}>Valor do pedido:</Text>
                        <Text style={styles.infoDetailDesc}>R$ {orderAmount}</Text>
                    </View>
                    {(shippingType !== null) ?
                        <View style={styles.infoDetailContainer}>
                            <Text style={styles.buyTitleText}>Tipo de entrega:</Text>
                            <Text style={styles.infoDetailDesc}>{shippingType}</Text>
                        </View>
                        : null
                    }
                    {(shippingDeadLine !== null) ?
                        <View style={styles.infoDetailContainer}>
                            <Text style={styles.buyTitleText}>Prazo de entrega:</Text>
                            <Text style={styles.infoDetailDesc}>{shippingDeadLine}</Text>
                        </View>
                        : null
                    }
                    <View style={styles.infoDetailContainer}>
                        <Text style={styles.buyTitleText}>Valor total:</Text>
                        <Text style={styles.infoDetailDesc}>R$ {total}</Text>
                    </View>
                </PlabCardView>
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
                                        <Text style={styles.buyDescText}>{shipping.title}</Text>
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
                                        <Text style={styles.buyDescText}>{shipping.city}</Text>
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
            <TouchableHighlight onPress={() => addAddress()}>Adicionar endereço</TouchableHighlight>
            <PlabButton
                style={styles.button}
                text="CONTINUAR"
                onPress={() => this.save()} />
        </ScrollView >
    )
}

export default CartShipping