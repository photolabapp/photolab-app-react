import React from 'react'
import { View, Text } from 'react-native'
import { PlabCardView } from '../../../../components'
import styles from './styles'

export default DetailOrderCardView = ({ order }) => {

    console.log(" SL<LSDLKDLSK " + JSON.stringify(order))

    const getTotal = () => {
        var total = 0
        order.album.forEach(album => {
            total = total + (album.price * album.quantity)
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
                <Text style={styles.orderInfoTitle}>Quantidade de fotos:</Text>
                <Text style={styles.orderInfoDesc}>{order.album.length}</Text>
            </View>

            {(typeof order.shipping !== 'undefined' && order.shipping.type !== null) ?
                <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoTitle}>Tipo de entrega:</Text>
                    <Text style={styles.orderInfoDesc}>{order.shipping.type}</Text>
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
            <View style={styles.orderInfoContainer}>
                <Text style={styles.orderInfoTitle}>Valor total:</Text>
                <Text style={styles.orderInfoDesc}>R$ {getTotal()}</Text>
            </View>

        </PlabCardView>
    )
}
