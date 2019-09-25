import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

class CartSuccess extends Component {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
    buttonContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: (screenHeight - 73) - 50,
        position: "absolute"
    },
    buttonAddAddressContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: (screenHeight - 73) - 120,
        position: "absolute"
    },
    cardViewContainer: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        paddingBottom: 4,
        backgroundColor: "white",
        elevation: 2
    },
})

const mapStateToProps = state => {
    return { address: state.address }
}

export default connect(mapStateToProps)(CartAddress)