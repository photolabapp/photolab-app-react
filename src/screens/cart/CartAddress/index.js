import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Text, TouchableHighlight } from 'react-native'
import styles from './styles'

class CartAddress extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View styles={styles.container}>
                {this.props.address.map(address => (
                    <View style={styles.cardViewContainer}>
                        <Text>{address.address}, {address.number}</Text>
                        <Text>{address.city} - {address.state}</Text>
                        <Text>{address.cep}</Text>
                    </View>
                ))}

                <TouchableHighlight
                    style={[styles.buttonAddAddressContainer, {backgroundColor: "#00b5ec"}]}
                    onPress={this.next()}>
                    <Text style={{ color: '#FFF' }}>adicionar endereço</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonContainer, {backgroundColor: "#00b5ec"}]}
                    onPress={this.next()}>
                    <Text style={{ color: '#FFF' }}>CONTINUAR</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const screenHeight = Math.round(Dimensions.get('window').height)

const mapStateToProps = state => {
    return { address: state.address }
}

export default connect(mapStateToProps)(CartAddress)