import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableHighlight, Text } from 'react-native'

export default PlabButton = (props) => {
    return (
        <TouchableHighlight
            style={[styles.buttonContainer, styles.button, { ...props.style }]}
            onPress={props.onPress}>
            <Text style={{ color: '#FFF', fontSize: 16 }}>{props.text}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#00b5ec",
    }
})