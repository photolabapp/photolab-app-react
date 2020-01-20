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
            recipient: null,
            deletable: false,
            deadLine: 1,
            price: 0.0,
            selected: true,
        },
        {
            index: 1,
            id: 2,
            title: "Entrega - Casa",
            address: "Rua lllllll, 953",
            complement: null,
            cep: "00000-000",
            city: "São Paulo - SP",
            recipient: "Mauricio",
            deletable: false,
            deadLine: 10,
            price: 12.0,
            selected: false,
        },
        {
            index: 2,
            id: 3,
            title: "Entrega - Trabalho",
            address: "Rua ggggggg, 753",
            complement: "Apt. 25",
            cep: "00000-000",
            city: "São Paulo - SP",
            recipient: "Mauricio",
            deletable: false,
            deadLine: 13,
            price: 21.0,
            selected: false,
        },
    ]

    const [data, setData] = useState(mock)

    const updateShipping = index => {
        console.log("LSKDLSKD call " + index)
        for (key in mock) {
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
                <PlabCardView style={styles.cardViewContainer}>
                    <Text style={styles.shippingTitle}>Detalhe do pedido</Text>
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor do pedido:</Text>
                        <Text style={styles.buyDescText}>R$ 123.3</Text>
                    </View>
                    {(shippingType !== null) ?
                        <View style={styles.buyInfo}>
                            <Text style={styles.buyTitleText}>Tipo de entrega:</Text>
                            <Text style={styles.buyDescText}>{shippingType}</Text>
                        </View>
                        : null
                    }
                    {(shippingDeadLine !== null) ?
                        <View style={styles.buyInfo}>
                            <Text style={styles.buyTitleText}>Prazo de entrega:</Text>
                            <Text style={styles.buyDescText}>{shippingDeadLine}</Text>
                        </View>
                        : null
                    }
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Valor total:</Text>
                        <Text style={styles.buyDescText}>R$ {total}</Text>
                    </View>
                </PlabCardView>
                <Text style={{color: 'black', marginTop: 8}}>Selecine um tipo de entrega:</Text>
                {data.map(shipping => (
                    <TouchableOpacity 
                        onPress={() => updateShipping(shipping.index)}
                        activeOpacity={1}>
                        <PlabCardView style={styles.cardViewContainer}>
                            <Text style={styles.shippingTitle}>{shipping.title}</Text>
                            <View style={styles.buyInfo}>
                                <Text style={styles.buyTitleText}>Endereço:</Text>
                                <Text style={styles.buyDescText}>{shipping.address}</Text>
                            </View>
                            <View style={styles.buyInfo}>
                                <Text style={styles.buyTitleText}>Cidade:</Text>
                                <Text style={styles.buyDescText}>{shipping.city}</Text>
                            </View>
                            {(shipping.complement !== null) ?
                                <View style={styles.buyInfo}>
                                    <Text style={styles.buyTitleText}>Complemento:</Text>
                                    <Text style={styles.buyDescText}>{shipping.complement}</Text>
                                </View>
                                : null}
                            <View style={styles.buyInfo}>
                                <Text style={styles.buyTitleText}>Cep:</Text>
                                <Text style={styles.buyDescText}>{shipping.cep}</Text>
                            </View>
                            {(shipping.complement !== null) ?
                                <View style={styles.buyInfo}>
                                    <Text style={styles.buyTitleText}>Destinatário:</Text>
                                    <Text style={styles.buyDescText}>{shipping.recipient}</Text>
                                </View>
                                : null}
                        </PlabCardView>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
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