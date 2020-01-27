import React, { useState } from 'react'
import { View } from 'react-native'
import styles from './styles'
import { createAddress } from '../../../services/Api'

const CreateAddress = () => {
    const [loading, setLoading] = useState(null)

    const [cep, setCep] = useState(null)
    const [address, setAddress] = useState(null)
    const [number, setNumber] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [complement, setComplement] = useState(null)
    const [type, setType] = useState(null)
    const [recipient, setRecipient] = useState(null)

    const [error, setError] = useState(null)

    const save = () => {
        this.setLoading(true)

        const obj = {
            cep: cep,
            address: address,
            number: number,
            city: city,
            state: state,
            complement: complement,
            type: type,
            recipient: recipient
        }

        const error = validate(obj)
        if (error.size > 0) {
            setError(error)
            setLoading(false)
        } else {
            createAddress(obj).then(response => {
                setLoading(false)

                Alert.alert("Cadastro", "Cadastro efetuado com sucesso!!!!")
            }).catch(error => {
                setLoading(false)
                if (error.response && error.response.status == 412) {
                    Alert.alert("Cadastro", error.response.data.message)
                } else {
                    Alert.alert("Cadastro", "Erro no cadastro, tente novamamente!!!!")
                }
            });
        }
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" animating={loading} />

            <Picker
                mode="dropdown"
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
                <Picker.Item label="Casa" value="casa" />
                <Picker.Item label="Trabalho" value="trabalho" />
            </Picker>

            <PlabTextInput
                style={styles.input}
                placeholder="destinatário"
                errorMessage={error["recipient"]}
                onChangeText={recipient => setRecipient(recipient)} />

            <PlabTextInput
                style={styles.input}
                placeholder="cep"
                keyboardType="numeric"
                size="8"
                errorMessage={error["cep"]}
                onChangeText={cep => setCep(cep)} />

            <PlabTextInput
                style={styles.input}
                placeholder="endereço"
                errorMessage={error["address"]}
                onChangeText={address => setAddress(address)} />

            <PlabTextInput
                style={styles.input}
                placeholder="numero"
                keyboardType="numeric"
                size="6"
                errorMessage={error["number"]}
                onChangeText={number => setNumber(number)} />

            <PlabTextInput
                style={styles.input}
                placeholder="complemento"
                errorMessage={error["complement"]}
                onChangeText={complement => setComplement(complement)} />

            <Picker
                mode="dropdown"
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
                <Picker.Item label="SP" value="SP" />
                <Picker.Item label="RJ" value="RJ" />
                <Picker.Item label="MG" value="MG" />
            </Picker>

            <PlabTextInput
                style={styles.input}
                placeholder="cidade"
                errorMessage={error["city"]}
                onChangeText={city => setCity(city)} />

            <PlabButton
                style={styles.button}
                text="Salvar"
                onPress={() => save()} />
        </View>
    )
}

export default CreateAddress