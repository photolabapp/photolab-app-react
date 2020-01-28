import React from 'react'
import { View, Text } from 'react-native'
import { PlabCardView } from '../../../../components'
import styles from './styles'

const DetailOrderCardView = ({ order }) => {

    const getTotal = (order) => {
        var total = 0
        order.album.forech(album => {
            total = total + (album.price * album.quantity)
        })

        if (order.shipping != null) {
            total = total + shipping.price
        }

        return total
    }


    return (
        <PlabCardView style={{ marginStart: 16, marginEnd: 16, marginTop: 24 }}>
            <Text style={styles.detailOrderTitle}>Resumo do pedido</Text>

            {  /*
                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Quantidade de fotos:</Text>
                        <Text style={styles.buyDescText}>{this.state.quantity}</Text>
                    </View>

                    <View style={styles.buyInfo}>
                        <Text style={styles.buyTitleText}>Formato da foto:</Text>
                        <Text style={styles.buyDescText}>{this.state.format}</Text>
                    </View>
                    
                    <View style={styles.detailOrderContainer}>
                        <Text style={styles.detailOrderTitle}>Valor da foto:</Text>
                        <Text style={styles.detailOrderDesc}>R$ {order.value}</Text>
                    </View>
                */
            }

            <View style={styles.detailOrderContainer}>
                <Text style={styles.detailOrderTitle}>Quantidade de fotos:</Text>
                <Text style={styles.detailOrderDesc}>{order.album.length}</Text>
            </View>

            {(order.shipping !== null && order.shipping.type !== null) ?
                <View style={styles.infoDetailContainer}>
                    <Text style={styles.buyTitleText}>Tipo de entrega:</Text>
                    <Text style={styles.infoDetailDesc}>{order.shipping.type}</Text>
                </View>
                : null
            }
            {(order.shipping !== null && order.shipping.deadLine !== null) ?
                <View style={styles.infoDetailContainer}>
                    <Text style={styles.buyTitleText}>Prazo de entrega:</Text>
                    <Text style={styles.infoDetailDesc}>{order.shipping.deadLine}</Text>
                </View>
                : null
            }
            <View style={styles.infoDetailContainer}>
                <Text style={styles.buyTitleText}>Valor total:</Text>
                <Text style={styles.infoDetailDesc}>R$ {getTotal()}</Text>
            </View>

        </PlabCardView>
    )
}

export default DetailOrderCardView
