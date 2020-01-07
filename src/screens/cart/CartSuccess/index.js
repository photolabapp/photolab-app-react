import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { clearOrder } from '../../../store/OrderAction'
import { PlabButton, PlabCardView } from '../../../components'
import styles from './styles'
import { createStackNavigator, createAppContainer } from 'react-navigation';

class CartSuccess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order: this.props.order
        }

        this.props.clearOrder()
    }

    componentDidMount() {
        this.blurHandler = this.props.navigation.addListener('didBlur', () => this.blurNavigation())
    }

    componentWillUnmount() {
        this.blurHandler.remove()
    }

    blurNavigation = () => {
        this.props.navigation.popToTop()
        this.props.navigation.navigate("Album")
    }

    render() {
        return (
            <View styles={styles.container}>
                <PlabCardView style={{ marginStart: 16, marginEnd: 16, marginTop: 16 }}>
                    <Text style={[styles.textNormal, styles.text, { marginBottom: 24, marginTop: 8, fontSize: 20 }]}>{this.props.user.name},</Text>
                    <Text style={[styles.textNormal, styles.text, { marginBottom: 24 }]}>Parabéns seu pedido foi realizado com sucesso!!</Text>
                    <Text style={[styles.textBold, styles.text, { marginBottom: 8 }]}>Número do pedido é:</Text>
                    <Text style={[styles.textOrange, styles.text, { marginBottom: 8 }]}>{this.state.order.id}</Text>
                </PlabCardView>

                <PlabCardView style={{ marginStart: 16, marginEnd: 16, marginTop: 32 }}>
                    <Text style={[styles.cardViewHeader, styles.text]}>Acompanhe o seu pedido</Text>
                    <Text style={[styles.textNormal, { marginBottom: 24, marginTop: 16 }, styles.text]}>Você pode acompanhar o processamento do seu pedido a qualquer momento na página Meus Pedidos</Text>
                    <View style={{ paddingStart: 16, paddingEnd: 16, paddingBottom: 16 }}>
                        <PlabButton text="ACOMPANHE MEU PEDIDO" />
                    </View>
                </PlabCardView>
            </View>
        )
    }
}



const mapDispatchToProps = dispatch => (
    bindActionCreators({ clearOrder }, dispatch)
)

const mapStateToProps = state => {
    return {
        order: state.order.order,
        user: state.user.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSuccess)