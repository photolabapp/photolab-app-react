import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Colors from '../../utils/Colors'
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
                    <Text style={[styles.textNormal, { marginBottom: 24, marginTop: 8, fontSize: 20 }]}>Mauricio,</Text>
                    <Text style={[styles.textNormal, { marginBottom: 24 }]}>Parabéns seu pedido foi realizado com sucesso!!</Text>
                    <Text style={[styles.textBold, { marginBottom: 8 }]}>Número do pedido é:</Text>
                    <Text style={[styles.textOrange, { marginBottom: 8 }]}>3233213</Text>
                </CardView>

                <CardView style={{ marginStart: 16, marginEnd: 16, marginTop: 32 }}>
                    <Text style={styles.cardViewHeader}>Acompanhe o seu pedido</Text>
                    <Text style={[styles.textNormal, { marginBottom: 24 }]}>Você pode acompanhar o processamento do seu pedido a qualquer momento na página Meus Pedidos</Text>
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
    textBold: {
        marginStart: 16,
        marginEnd: 16,
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: "bold"
    },
    textNormal: {
        marginStart: 16,
        marginEnd: 16,
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
    },
    textOrange: {
        marginStart: 16,
        marginEnd: 16,
        color: Colors.orange,
        fontSize: 24,
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: "bold"
    },
    cardViewHeader: {
        paddingStart: 16,
        marginBottom: 16,
        height: 40,
        backgroundColor: "#D2D2D2",
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: "bold"
    },
})

const mapStateToProps = state => {
    return {
        order: state.order,
        user: state.user
    }
}

export default connect(mapStateToProps)(CartSuccess)
