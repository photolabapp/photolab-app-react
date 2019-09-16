import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-picker'


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
                <View style={styles.buyDataContainer}>
                    <Text style={styles.buyTitleText}>
                        Quantidade de fotos:
                        <Text style={styles.buyTitleText}>
                            {this.props.album.album.length}
                        </Text>
                    </Text>
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
    buyDataContainer: {
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