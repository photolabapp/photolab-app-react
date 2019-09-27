import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import CardView from '../../components/CardView'
import { connect } from 'react-redux'

class CartSuccess extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View styles={styles.container}>
                <CardView>
                    <Text>Mauricio,</Text>
                    <Text>Parabéns seu pedido foi realizado com sucesso!!</Text>
                    <Text>Número do pedido: 3233213</Text>
                </CardView>
            </View>
        )
    }
}

const screenHeight = Math.round(Dimensions.get('window').height)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    }
})

const mapStateToProps = state => {
    return { order: state.order }
}

export default connect(mapStateToProps)(CartSuccess)
