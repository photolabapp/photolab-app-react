import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Text, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native'
import { PlabCardView } from '../../../components'
import styles from './styles'

const CartShipping = () => {
    const orderAmount = 123.3

    const [total, setTotal] = useState(orderAmount)
    const [shippingType, setShippingType] = useState(null)
    const [shippingDeadLine, setShippingDeadLine] = useState(null)

    const mock = [
        {
            index: 0,
            id: 1,
            title: "Retirada na loja",
            address: "Rua sddd, 753",
            complement: null,
            cep: "00000-000",
            city: "São Paulo - SP",
            recipient: "Mauricio",
            deletable: false,
            deadLine: "1 dia útil",
            price: 0.0,
            selected: true,
        },
    ]

    const [data, setData] = useState(mock)

    const updateShipping = index => {
        console.log("LSKDLSKD call " + index)
        for (key in data) {
            console.log("LSKDLSKD call key " + key)
            mock[key].selected = (key === index)
        }

        setData(mock)
        setTotal(orderAmount + mock[index].price)
        setShippingType(mock[index].title)
        setShippingDeadLine(mock[index].deadLine)
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
                        onPress={() => updateShipping(shipping.index)}
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
        </ScrollView >
    )
}

export default CartShipping

/*
class CartShipping extends Component {
    constructor(props) {
        super(props)
    }

    render() {

    }
}

const screenHeight = Math.round(Dimensions.get('window').height)

const mapStateToProps = state => {
    return { address: state.address }
}

export default connect(mapStateToProps)(CartAddress)
*/