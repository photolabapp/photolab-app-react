import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from 'react-navigation-hooks'
import { updateOrder } from '../../../store/OrderAction'
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native'
import { PlabCardView } from '../../../components'
import DetailOrderCardView from '../components/DetailOrderCardView'
import styles from './styles'
import { PlabButton, PlabTextInput } from '../../../components'

import visa from '../../../assets/visa.png';
import mastercard from '../../../assets/mastercard.png';

const CartPayment = () => {

    const [cvv, setCvv] = useState(null)
    const [installment, setInstallmente] = useState(1)

    const order = useSelector(state => state.order);
    const dispatch = useDispatch();

    const { navigate } = useNavigation();

    const next = () => {
        const newOrder = { ...order }
        newOrder.payment.cvv = cvv
        newOrder.payment.installment = installment
        dispatch(updateOrder(newOrder))

        navigate('CartCheckout')
    }

    return (
        <>
            <ScrollView>
                <View styles={styles.container}>
                    <DetailOrderCardView order={order} />
                    <PlabCardView style={styles.cardViewContainer}>
                        {(typeof order !== 'undefined' && typeof order.payment !== 'undefined') ?
                            <View style={styles.infoContainer}>
                                <Text style={styles.infoDesc}>{order.payment.number}</Text>
                                <Image style={styles.infoIcon} source={order.payment.brand === "VISA" ? visa : mastercard} />
                            </View>
                            : null}
                    </PlabCardView>

                    <View style={{ marginStart: 16, marginEnd: 16 }}>
                        <PlabTextInput
                            style={styles.input}
                            placeholder="código de segurança"
                            keyboardType="numeric"
                            size="3"
                            //errorMessage={this.state.error.get("email")}
                            onChangeText={(cvv) => setCvv(cvv)} />
                    </View>

                </View>
            </ScrollView >

            <PlabButton
                style={{ width: "100%", position: "absolute", bottom: 0 }}
                text="FINALIZAR PEDIDO"
                onPress={() => next()} />
        </>
    )
}


export default CartPayment