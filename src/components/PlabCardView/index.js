import React from 'react'
import { View } from 'react-native'

export const PLabCardView = (props) => {
    return (
        <View style={[styles.cardViewContainer, { ...props.style }]}>
            {props.children}
        </View>
    )
}