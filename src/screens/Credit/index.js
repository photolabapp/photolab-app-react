import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
    Text,
    View,
    FlatList,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { PlabCardView } from '../../components'
import { getCredit, getCreditTransactions } from '../../services/Api'
import styles from './styles';

const Credit = () => {

    const [credit, setCredit] = useState(0)
    const [transactions, setTransactions] = useState(null)

    const user = useSelector(state => state.user.user)

    useEffect(() => {
        getCredit(user.id)
            .then(response => setCredit(response.data.quantity))
            .catch(err => console.log("Get credit error " + err))

        getCreditTransactions(user.id)
            .then(response => setTransactions(response.data))
            .catch(err => console.log("Get transactions error " + err))
    }, []);

    const renderItem = ({ item, index }) => {
        <View>
            <View>
                <Text>{item.type}</Text>
            </View>
            <View>
                <Text>{item.quantity}</Text>
                <Text>{item.dtCreate}</Text>
            </View>
        </View>
    }

    const addCredit = () => {

    }

    return (
        <View style={styles.container}>
            <PlabCardView>
                <Text>Crédito: {credit} fotos</Text>
            </PlabCardView>
            <TouchableHighlight onPress={() => addCredit()}>
                <Text style={styles.button}>click aqui para comprar crédito</Text>
            </TouchableHighlight>
            <ScrollView>
                <FlatList
                    data={transactions}
                    renderItem={renderItem} />
            </ScrollView>
        </View>
    )
}

export default Credit