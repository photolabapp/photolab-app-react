import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { View, Text, BackHandler } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { clearOrder } from '../../../store/OrderAction'
import { PlabButton, PlabCardView } from '../../../components'
import Upload from 'react-native-background-upload'
import RNFS from 'react-native-fs'

import styles from './styles'

const CartCheckout = () => {

    const [loading, setLoading] = useState(false)
    const order = useSelector(state => state.order)
    const user = useSelector(state => state.user.user)
    const [orderId, setOrderId] = useState(order.id)
    const { navigate, popToTop, dispatch, reset } = useNavigation();

    const backPress = () => {
        //goToAlbum()
        popToTop()
        navigate("Album")
    }

    const goToAlbum = () => {
        dispatch(reset({
            index: 0,
            actions: [
                navigate('Album')
            ]
        }));
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backPress);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backPress);
        };
    }, [backPress]);

    fetchUploadAndClearOrder = (clearOrder) => {
        const dispatch = useDispatch();
        useEffect(() => {
            fetchUpload()
            dispatch(clearOrder());
        }, [])
    }

    fetchUploadAndClearOrder(clearOrder)
    const fetchUpload = () => {
        order.album.forEach(photo => {
            uploadPhoto(photo)
        })
    }

    const uploadPhoto = photo => {
        file = (photo.format === '10x15') ? photo.cropped10x15 : photo.cropped15x20
        if (Platform.OS == "android") {
            file = file.replace("file://", "");
        }

        Upload.startUpload({
            url: "http://ec2-34-201-70-135.compute-1.amazonaws.com:8080/photo",
            //url: "http://192.168.0.7:8080/photo",
            path: file,
            method: 'POST',
            field: 'photo',
            type: 'multipart',
            parameters: {
                user: "" + user.id,
                order: "" + order.id,
                format: photo.format,
                quantity: "" + photo.quantity
            },
            notification: {
                enabled: true,
                autoclear: true,
                onProgressTitle: "Carregando....",
                onProgressMessage: "Enviando foto",
                onCompleteTitle: "Envio finalizado",
                onCompleteMessage: "Foto enviada com sucesso!!"
            }
        }).then(uploadId => {
            Upload.addListener('progress', uploadId, data => {
                console.log(`LSKDLS -- Progress: ${data.progress}%`)
            })
            Upload.addListener('error', uploadId, data => {
                console.log(`LSKDLS -- upload album Error: ${data.error}`)
            })
            Upload.addListener('cancelled', uploadId, data => {
                console.log(`LSKDLS -- Cancelled!`)
            })
            Upload.addListener('completed', uploadId, data => {
                console.log('LSKDLS -- Completed! ' + file)
                let raw = photo.raw
                let cropped10x15 = photo.cropped10x15
                let cropped15x20 = photo.cropped15x20
                if (Platform.OS == "android") {
                    raw = raw.replace("file://", "");
                    cropped10x15 = cropped10x15.replace("file://", "");
                    cropped15x20 = cropped15x20.replace("file://", "");
                }

                RNFS.unlink(raw)
                    .then(() => console.log('DELETE FILE SUCCESS ------ raw ' + raw))
                    .catch((err) => console.log("DELETE FILE ERROR ------ raw " + err.message));
                RNFS.unlink(cropped10x15)
                    .then(() => console.log('DELETE FILE SUCCESS ------ cropped10x15 ' + cropped10x15))
                    .catch((err) => console.log("DELETE FILE ERROR ------ cropped10x15 " + err.message));
                RNFS.unlink(cropped15x20)
                    .then(() => console.log('DELETE FILE SUCCESS ------ cropped15x20 ' + cropped15x20))
                    .catch((err) => console.log("DELETE FILE ERROR ------ cropped15x20 " + err.message));
            })
        }).catch(err => {
            //this.setState({ indicator: false })
            console.log('Upload error ', err)
        })
    }

    return (
        (loading) ?
            <ActivityIndicator style={styles.loading} size="large" animating={true} />
            :
            <View styles={styles.container}>
                <PlabCardView style={{ marginStart: 16, marginEnd: 16, marginTop: 16 }}>
                    <Text style={[styles.textNormal, styles.text, { marginBottom: 24, marginTop: 8, fontSize: 20 }]}>{user.name},</Text>
                    <Text style={[styles.textNormal, styles.text, { marginBottom: 24 }]}>Parabéns seu pedido foi realizado com sucesso!!</Text>
                    <Text style={[styles.textBold, styles.text, { marginBottom: 8 }]}>Número do pedido é:</Text>
                    <Text style={[styles.textOrange, styles.text, { marginBottom: 8 }]}>{orderId}</Text>
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

export default CartCheckout