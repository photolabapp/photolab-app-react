import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, Alert, BackHandler } from 'react-native'
import { useSelector } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import styles from './styles'
import { useNavigation } from 'react-navigation-hooks'
import { PlabTextInput } from '../../../components'
import { createCreditCard } from '../../../services/Api'
import { ScrollView } from 'react-native-gesture-handler'
import validate from './validate'

const CreateCreditCard = () => {
    const [loading, setLoading] = useState(false)
    const [number, setNumber] = useState(null)
    const [cardHolder, setCardHolder] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [dueDate, setDueDate] = useState(null)
    const [error, setError] = useState({})

    const user = useSelector(state => state.user.user);

    const { popToTop, navigate } = useNavigation();

    const backPress = () => {
        popToTop()
        navigate('CartPayment')

        return true
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backPress);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backPress);
        };
    }, []);

    const onChangeCpf = cpf => {
        var cpfMask = MaskService.toMask('cpf', cpf)
        setCpf(cpfMask)
    }

    const onChangeNumber = number => {
        var numberMask = MaskService.toMask('credit-card', number)
        setNumber(numberMask)
    }

    const onChangeDueDate = dueDate => {
        var dueDateMask = MaskService.toMask('custom', dueDate, {
            mask: '99/9999'
        })
        setDueDate(dueDateMask)
    }

    const save = () => {
        setLoading(true)

        const obj = {
            userId: user.id,
            number: number,
            cardHolder: cardHolder,
            cpf: cpf,
            dueDate: dueDate
        }   

        const errorValidate = validate(obj)
        if (Object.keys(errorValidate).length > 0) {
            setError(errorValidate)
            setLoading(false)
        } else {
            createCreditCard(obj).then(response => {
                setLoading(false)

                Alert.alert("Cadastro", "Cadastro efetuado com sucesso!!!!")
                popToTop()
                navigate('CartPayment')
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

                    <PlabTextInput
                        style={styles.input}
                        placeholder="numero"
                        errorMessage={error["number"]}
                        keyboardType='numeric'
                        value={number}
                        onChangeText={number => onChangeNumber(number)} />

                    <PlabTextInput
                        style={styles.input}
                        placeholder="nome impresso no cartão"
                        errorMessage={error["cardHolder"]}
                        onChangeText={cardHolder => setCardHolder(cardHolder)} />

                    <PlabTextInput
                        style={styles.input}
                        placeholder="cpf proprietário do cartão"
                        value={cpf}
                        errorMessage={error["cpf"]}
                        keyboardType='numeric'
                        onChangeText={cpf => onChangeCpf(cpf)} />

                    <PlabTextInput
                        style={styles.input}
                        placeholder="data de validade"
                        keyboardType="numeric"
                        value={dueDate}
                        errorMessage={error["dueDate"]}
                        onChangeText={dueDate => onChangeDueDate(dueDate)} />
                </View>
            </ScrollView>
            <PlabButton
                style={{ width: "100%", position: "absolute", bottom: 0 }}
                text="Salvar"
                onPress={() => save()} />
        </>
    )
}

export default CreateCreditCard