import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Colors from '../../utils/Colors'
import { Button, CardView } from '../../components/UIKit'
import { connect } from 'react-redux'

class CartSuccess extends Component {
    constructor(props) {
        super(props)
    }

    uploadPhoto = path => {
        Upload.startUpload({
            url: 'http://192.168.1.106:8080',
            path: path,
            method: 'POST',
            field: 'uploaded_media',
            type: 'multipart',
            notification: { enabled: true }
        }).then(uploadId => {
            console.log('Upload started')
            Upload.addListener('progress', uploadId, data => {
                console.log(`Progress: ${data.progress}%`)
            })
            Upload.addListener('error', uploadId, data => {
                console.log(`Error: ${data.error}%`)
            })
            Upload.addListener('cancelled', uploadId, data => {
                console.log(`Cancelled!`)
            })
            Upload.addListener('completed', uploadId, data => {
                // data includes responseCode: number and responseBody: Object
                console.log('Completed!')
            })
        }).catch(err => console.log('Upload error!', err))
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
    } F
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
        backgroundColor: "#D2D2D2",
        color: "black",
        fontWeight: "bold"
    },
})

//https://github.com/Vydia/react-native-background-upload

const mapStateToProps = state => {
    return {
        order: state.order.order,
        user: state.user.user
    }
}

export default connect(mapStateToProps)(CartSuccess)
