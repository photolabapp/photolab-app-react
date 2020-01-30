import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from 'react-navigation-hooks'
import { updateOrder } from '../../../store/OrderAction'
import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image
} from 'react-native'
import { PlabCardView } from '../../../components'
import DetailOrderCardView from '../components/DetailOrderCardView'
import styles from './styles'
import { getShippingAddress } from '../../../services/Api'

import visa from '~/assets/visa.png';
import mastercard from '~/assets/mastercard.png';

const CartPayment = () => {

    const [loading, setLoading] = useState(true)
    const [creditCards, setCreditCards] = useState(null)
    const [credit, setCredit] = useState(null)

    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const { navigate } = useNavigation();

    useEffect(() => {
        const getData = async () => {

            try {
                const creditCard = await getCreditCard({ id: 1 })
                setCreditCards(creditCard.data)

                const credit = await getCredit({ id: 1 })
                setCredit(credit.data)

                setLoading(false)
            } catch (err) {
                setLoading(false)
                Alert.alert("Carrinho", "Error ao obter os cartões")
            }
        }
        getData()
    }, []);

    const updateCredit = item => {
        dispatch(updateOrder({ ...order, payment: { ...item, type: "CREDIT" } }))
    }

    const updateCreditCard = item => {
        dispatch(updateOrder({ ...order, payment: { ...item, type: "CREDITCARD" } }))
    }

    const addCreditCard = () => {
        navigate('CreateCreditCard')
    }

    const next = () => {
        if (order.payment.type === "CREDIT") {
            navigate('CartCheckout')
        } else {
            navigate('CartCreditCard')
        }
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
                            {data.map(payment => (
                                <TouchableOpacity
                                    onPress={() => updateCreditCard(payment)}
                                    activeOpacity={1}>
                                    <PlabCardView style={styles.cardViewContainer}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ width: "3%", backgroundColor: (typeof order.shipping !== 'undefined' && shipping.id === order.shipping.id) ? '#535f69' : '#FFF' }} />
                                            <View style={{ width: "97%" }}>
                                                <View style={styles.infoContainer}>
                                                    <Text style={styles.infoDesc}>{payment.number}</Text>
                                                    <Image style={style.infoIcon} src={payment.brand} />
                                                </View>=
                                            </View>
                                        </View>
                                    </PlabCardView>
                                </TouchableOpacity>
                            ))}

                            <TouchableHighlight onPress={() => addCreditCard()}>
                                <Text style={styles.buttonAddPaymentContainer}>click aqui para adicionar novo endereço</Text>
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

export default CartPayment