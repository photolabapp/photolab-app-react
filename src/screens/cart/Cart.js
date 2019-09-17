import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current: 1,
            total: 0,
            value: 20.0,
        }
    }

    render() {
        return (
            <View styles={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Sacola de Compra</Text>
                </View>

                <View style={styles.cardViewContainer}>
                    <Text style={styles.buyTitleText}>
                        Quantidade de fotos:
                        <Text style={styles.buyTitleText}>
                            {this.props.album.album.length}
                        </Text>
                    </Text>
                    <Text style={styles.buyTitleText}>
                        Valor da foto:
                        <Text style={styles.buyTitleText}>
                            R$ {this.state.value}
                        </Text>
                    </Text>
                    <Text style={styles.buyTitleText}>
                        Valor total das fotos:
                        <Text style={styles.buyTitleText}>
                            R$ {this.state.value * this.props.album.album.length}
                        </Text>
                    </Text>
                </View>

                <View style={styles.cardViewContainer}>
                    
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        backgroundColor: "#D2D2D2",
        justifyContent: "center",
        alignItems: "center"
    },
    headerTitle: {
        flex: 1,
        flexDirection: "column",
        color: "black",
        fontSize: 18,
        textAlignVertical: "center"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#D2D2D2'
    },
    cardViewContainer: {
        height: 400,
        flexDirection: "column",
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        padding: 10,
        backgroundColor: "white",
        elevation: 4
    },
    buyTitleText: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        flexDirection: 'row',
        color: "black"
    }
})

const mapStateToProps = album => {
    return { album: album.album }
}

export default connect(mapStateToProps)(Cart)