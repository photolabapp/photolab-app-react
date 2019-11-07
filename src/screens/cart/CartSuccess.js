import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Colors from '../../utils/Colors'
import { updateOrder } from '../../store/OrderAction'
import { Button, CardView } from '../../components/UIKit'
import { connect } from 'react-redux'

class CartSuccess extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View styles={styles.container}>
                <CardView style={{ marginStart: 16, marginEnd: 16, marginTop: 16 }}>
                    <Text style={[styles.textNormal, styles.text, { marginBottom: 24, marginTop: 8, fontSize: 20 }]}>{this.props.user.name},</Text>
                    <Text style={[styles.textNormal, styles.text, { marginBottom: 24 }]}>Parabéns seu pedido foi realizado com sucesso!!</Text>
                    <Text style={[styles.textBold, styles.text, { marginBottom: 8 }]}>Número do pedido é:</Text>
                    <Text style={[styles.textOrange, styles.text, { marginBottom: 8 }]}>{this.props.order.id}</Text>
                </CardView>

                <CardView style={{ marginStart: 16, marginEnd: 16, marginTop: 32 }}>
                    <Text style={[styles.cardViewHeader, styles.text]}>Acompanhe o seu pedido</Text>
                    <Text style={[styles.textNormal, { marginBottom: 24 }, styles.text]}>Você pode acompanhar o processamento do seu pedido a qualquer momento na página Meus Pedidos</Text>
                    <View style={{ paddingStart: 16, paddingEnd: 16, paddingBottom: 16 }}>
                        <Button text="ACOMPANHE MEU PEDIDO" />
                    </View>
                </CardView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
    text: {
        marginStart: 16,
        marginEnd: 16,
        textAlignVertical: "center",
        textAlign: "center"
    },
    textBold: {
        color: "black",
        fontWeight: "bold"
    },
    textNormal: {
        color: "black",
    },
    textOrange: {
        color: Colors.orange,
        fontSize: 24,
        fontWeight: "bold"
    },
    cardViewHeader: {
        height: 40,
        marginStart: 0,
        marginEnd: 0,
        backgroundColor: "#D2D2D2",
        color: "black",
        fontWeight: "bold"
    },
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateOrder }, dispatch)
)

const mapStateToProps = state => {
    return {
        order: state.order.order,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSuccess)