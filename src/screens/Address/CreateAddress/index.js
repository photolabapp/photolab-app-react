import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, Alert, BackHandler } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MaskService } from 'react-native-masked-text'
import { Picker } from '@react-native-community/picker'
import styles from './styles'
import { useNavigation } from 'react-navigation-hooks'
import { PlabTextInput } from '../../../components'
import { createAddress } from '../../../services/Api'
import { ScrollView } from 'react-native-gesture-handler'
import { NavigationActions } from "react-navigation";
import validate from './validate'

const CreateAddress = () => {
    const [loading, setLoading] = useState(false)

    const [cep, setCep] = useState(null)
    const [address, setAddress] = useState(null)
    const [neighborhood, setNeighborhood] = useState(null)
    const [number, setNumber] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [complement, setComplement] = useState(null)
    const [type, setType] = useState(null)
    const [recipient, setRecipient] = useState(null)

    const user = useSelector(state => state.user.user);

    const onChangeCep = cep => {
        const cepMask = MaskService.toMask('custom', cep, {
            mask: '99999-999'
        })
        setCep(cepMask)
    }

    const [error, setError] = useState(new Map())

    const { popToTop, navigate, goBack } = useNavigation();

    const backPress = () => {
        popToTop()
        navigate('CartShipping')

        return true
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backPress)
        };
    }, []);

    const states = () => {
        return ['AC', 'AP', 'AM', 'BA', 'CE', 'DF',
            'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
            'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    }

    const save = () => {
        setLoading(true)

        const obj = {
            userId: user.id,
            cep: cep,
            address: address,
            number: number,
            city: city,
            neighborhood: neighborhood,
            state: state,
            complement: complement,
            type: "Casa",
            recipient: recipient
        }

        const errorValidate = validate(obj)
        if (Object.keys(errorValidate).length > 0) {
            setError(errorValidate)
            setLoading(false)
        } else {
            createAddress(obj).then(response => {
                setLoading(false)

                Alert.alert("Cadastro", "Cadastro efetuado com sucesso!!!!")
                popToTop()
                navigate('CartShipping')
            }).catch(error => {
                setLoading(false)
                if (error.response && error.response.status == 412) {
                    Alert.alert("Cadastro", error.response.data.message)
                } else {
                    Alert.alert("Cadastro", "Erro no cadastro, tente novamamente!!!! " + error)
                }
            });
        }
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <ActivityIndicator size="large" style={styles.loading} animating={loading} />

                    {/*
                    <View style={styles.pickerContainer}>
                        <View style={{ width: '100%' }}>
                            <Picker
                                mode="dropdown"
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
                                <Picker.Item label="local da entrega" value="-1" />
                                <Picker.Item label="Casa" value="casa" />
                                <Picker.Item label="Trabalho" value="trabalho" />
                            </Picker>
                        </View>
                    </View>
                    */}

                    <PlabTextInput
                        style={styles.input}
                        placeholder="destinatário"
                        errorMessage={error["recipient"]}
                        onChangeText={recipient => setRecipient(recipient)} />

                    <PlabTextInput
                        style={styles.input}
                        placeholder="cep"
                        keyboardType="numeric"
                        value={cep}
                        errorMessage={error["cep"]}
                        onChangeText={cep => onChangeCep(cep)} />

                    <PlabTextInput
                        style={styles.input}
                        placeholder="endereço"
                        errorMessage={error["address"]}
                        onChangeText={address => setAddress(address)} />

                    <PlabTextInput
                        style={styles.input}
                        placeholder="bairro"
                        errorMessage={error["neighborhood"]}
                        onChangeText={neighborhood => setNeighborhood(neighborhood)} />

                    <View style={styles.splitContainer}>
                        <View style={{ flex: 3, marginEnd: 2 }}>
                            <PlabTextInput
                                style={styles.input}
                                placeholder="nº"
                                keyboardType="numeric"
                                maxlength={6}
                                errorMessage={error["number"]}
                                onChangeText={number => setNumber(number)} />
                        </View>

                        <View style={{ width: '70%', marginStart: 2 }}>
                            <PlabTextInput
                                style={styles.input}
                                placeholder="complemento"
                                errorMessage={error["complement"]}
                                onChangeText={complement => setComplement(complement)} />
                        </View>
                    </View>

                    <View style={styles.splitContainer}>
                        <View style={{ width: '30%', flex: 3, marginEnd: 2 }}>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={state}
                                    mode="dropdown"
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
                                    <Picker.Item label="uf" value="-1" />
                                    {states().map(state => <Picker.Item label={state} value={state} />)}
                                </Picker>
                                <Icon name="arrow-drop-down" style={{ position: 'absolute', right: 2, top: 4 }} size={40} color="#787d82" />
                            </View>
                        </View>

                        <View style={{ width: '70%', marginStart: 2 }}>
                            <PlabTextInput
                                style={styles.input}
                                placeholder="cidade"
                                errorMessage={error["city"]}
                                onChangeText={city => setCity(city)} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <PlabButton
                style={{ width: "100%", position: "absolute", bottom: 0 }}
                text="Salvar"
                onPress={() => save()} />
        </>
    )
}

export default CreateAddress