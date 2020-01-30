import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableHighlight, Text } from 'react-native'

export default PlabButton = (props) => {
    const { style, onPress, text, disabled } = props
    return (
        <TouchableHighlight
            disabled={disabled}
            style={[styles.buttonContainer, (disabled) ? styles.buttonDisabled : styles.button, { ...style }]}
            onPress={() => onPress()}>
            <Text style={{ color: '#FFF', fontSize: 16 }}>{text}</Text>
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
    },
    buttonDisable: {
        backgroundColor: "#2f2f2f"
    }
})