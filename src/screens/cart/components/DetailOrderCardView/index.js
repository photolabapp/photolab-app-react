import React from 'react'
import { View, Text } from 'react-native'
import { PlabCardView } from '../../../../components'
import styles from './styles'
import { formatAsCurrency } from '../../../../utils/Format'

export default DetailOrderCardView = ({ order }) => {

    console.log(" SL<LSDLKDLSK " + JSON.stringify(order))

    const getTotal = () => {
        var total = 0
        order.album.forEach(album => {
            total = total + parseInt(album.quantity)
        })

        return total
    }

    const getAmount = () => {
        var total = 0
        order.album.forEach(album => {
            total = total + (23.3 * parseInt(album.quantity))
        })

        if (typeof order.shipping !== 'undefined') {
            total = total + order.shipping.price
        }

        return total
    }

    return (
        <PlabCardView style={{ marginStart: 16, marginEnd: 16, marginBottom: 24, marginTop: 24 }}>
            <Text style={styles.orderInfoHeader}>Resumo do pedido</Text>

            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderInfoTitle}>Quantidade total de fotos:</Text>
                <Text style={styles.orderInfoDesc}>{getTotal()}</Text>
            </View>


            {(typeof order.shipping !== 'undefined' && order.shipping.type !== null) ?
                <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoTitle}>Tipo de entrega:</Text>
                    <Text style={styles.orderInfoDesc}>{order.shipping.type}</Text>
                </View>
                : null
            }

            {(typeof order.shipping !== 'undefined' && order.shipping.price !== null) ?
                <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoTitle}>Valor da entrega:</Text>
                    <Text style={styles.orderInfoDesc}>R$ {formatAsCurrency(order.shipping.price)}</Text>
                </View>
                : null
            }

            {(typeof order.shipping !== 'undefined' && order.shipping.deadLine !== null) ?
                <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoTitle}>Prazo de entrega:</Text>
                    <Text style={styles.orderInfoDesc}>{order.shipping.deadLine}</Text>
                </View>
                : null
            }

            {(typeof order.payment !== 'undefined') ?
                <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoTitle}>Tipo de pagamento:</Text>
                    <Text style={styles.orderInfoDesc}>{(order.payment === 'CREDIT') ? "Crédito" : "Cartão de Crédito"}</Text>
                </View>
                : null
            }

            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderInfoTitle}>Valor total:</Text>
                <Text style={styles.orderInfoDesc}>R$ {formatAsCurrency(getAmount())}</Text>
            </View>

        </PlabCardView>
    )
}
