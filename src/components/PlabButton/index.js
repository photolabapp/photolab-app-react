import React from 'react'
import { TouchableHighlight, Text } from 'react-native'

export const PlabButton = (props) => {
    return (
        <TouchableHighlight
            style={[styles.buttonContainer, styles.button, { ...props.style }]}
            onPress={props.onPress}>
            <Text style={{ color: '#FFF', fontSize: 16 }}>{props.text}</Text>
        </TouchableHighlight>
    )
}