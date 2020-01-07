import React from 'react'
import { View } from 'react-native'

export default PLabCardView = (props) => {
    return (
        <View style={[styles.cardViewContainer, { ...props.style }]}>
            {props.children}
        </View>
    )
}