import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import { updateOrder } from '../../../store/OrderAction'
import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
    Alert
} from 'react-native'
import { PlabCardView } from '../../../components'
import DetailOrderCardView from '../components/DetailOrderCardView'
import styles from './styles'
import { getCreditCard, getCredit } from '../../../services/Api'

import visa from '../../../assets/visa.png';
import mastercard from '../../../assets/mastercard.png';

const CartPayment = () => {

    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const [creditCards, setCreditCards] = useState(null)
    const [credit, setCredit] = useState(null)
    const [dataOrder, setDataOrder] = useState(order)
    const [titleButton, setTitleButton] = useState("CONTINUAR")
    const [disabledButton, setDisabledButton] = useState(true)

    const { navigate } = useNavigation();

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const creditCard = await getCreditCard(user)
            setCreditCards(creditCard.data)

            const credit = await getCredit(user)
            setCredit(credit.data)

            setLoading(false)
        } catch (err) {
            setLoading(false)
            Alert.alert("Carrinho", "Error ao obter os cartões")
        }
    }

    const getTotal = () => {
        var total = 0
        order.album.forEach(album => {
            total = total + parseInt(album.quantity)
        })

        return total
    }

    const updateCredit = item => {
        if (getTotal() > credit.quantity) {
            Alert.alert("Quantidade de fotos é superior a quantidade de créditos")
        } else {
            setDisabledButton(false)
            setTitleButton("FINALIZAR COMPRA")
            const newOrder = { ...order, payment: { ...item, type: "CREDIT" } }
            dispatch(updateOrder(newOrder))
            setDataOrder(newOrder)
        }
    }

    const updateCreditCard = item => {
        setDisabledButton(false)
        setTitleButton("CONTINUAR")
        const newOrder = { ...order, payment: { ...item, type: "CREDITCARD" } }
        dispatch(updateOrder(newOrder))
        setDataOrder(newOrder)
    }

    const addCreditCard = () => {
        navigate('CreateCreditCard')
    }

    const buyCredit = () => {

    }

    const next = () => {
        if (dataOrder.payment.type === "CREDIT") {
            navigate('CartCheckout')
        } else {
            navigate('CartCreditCardCheckout')
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
                            {
                                console.log("LKLKLKLKLKLK " + JSON.stringify(dataOrder))
                            }
                            <DetailOrderCardView order={dataOrder} />

                            <Text style={{ color: 'black', marginBottom: 6, paddingStart: 24, fontWeight: 'bold' }}>Crédito</Text>
                            <TouchableOpacity
                                onPress={() => updateCredit(credit)}
                                activeOpacity={1}>
                                <PlabCardView style={styles.cardViewContainer}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={
                                            {
                                                width: "3%",
                                                backgroundColor:
                                                    (typeof order.payment !== 'undefined'
                                                        && dataOrder.payment.type === 'CREDIT'
                                                        && credit.id === dataOrder.payment.id) ? '#535f69' : '#FFF'
                                            }} />
                                        <View style={{ width: "97%" }}>
                                            <View style={styles.infoContainer}>
                                                <Text style={styles.infoDesc}>{credit.quantity} fotos</Text>
                                            </View>
                                        </View>
                                    </View>
                                </PlabCardView>
                            </TouchableOpacity>

                            <TouchableHighlight onPress={() => buyCredit()}>
                                <Text style={styles.buttonBuyCredit}>click aqui para comprar crédito</Text>
                            </TouchableHighlight>

                            <Text style={{ color: 'black', marginBottom: 6, paddingStart: 24, fontWeight: 'bold' }}>Cartão de crédito</Text>
                            {creditCards.map(creditCard => (
                                <TouchableOpacity
                                    onPress={() => updateCreditCard(creditCard)}
                                    activeOpacity={1}>
                                    <PlabCardView style={styles.cardViewContainer}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{
                                                width: "3%",
                                                backgroundColor:
                                                    (typeof dataOrder.payment !== 'undefined'
                                                        && creditCard.id === dataOrder.payment.id
                                                        && dataOrder.payment.type === "CREDITCARD") ? '#535f69' : '#FFF'
                                            }} />
                                            <View style={{ width: "97%" }}>
                                                <View style={styles.infoContainer}>
                                                    <Text style={styles.infoDesc}>{creditCard.number}</Text>
                                                    <Image style={styles.infoIcon} source={creditCard.brand === "VISA" ? visa : mastercard} />
                                                </View>
                                            </View>
                                        </View>
                                    </PlabCardView>
                                </TouchableOpacity>
                            ))}

                            <TouchableHighlight onPress={() => addCreditCard()}>
                                <Text style={styles.buttonAddPaymentContainer}>click aqui para adicionar um cartão</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView >

                    <PlabButton
                        style={{ width: "100%", position: "absolute", bottom: 0 }}
                        disabled={disabledButton}
                        text={titleButton}
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