import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'

export default PLabCardView = (props) => {
    return (
        <View style={[styles.cardViewContainer, { ...props.style }]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardViewContainer: {
        borderRadius: 2,
        backgroundColor: "white",
        elevation: 2
    }
})