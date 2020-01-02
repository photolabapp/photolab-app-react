import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';

export const TextInput = (props) => {
    props.size = 200
    props.secureTextEntry = false

    return (
        <Input
                inputStyle={[styles.input, { ...props.style }]}
                containerStyle={{ marginBottom: 8, height: 70 }}
                placeholderTextColor="#787d82"
                errorStyle={{ color: 'red' }}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                size={props.size}
                errorMessage={props.errorMessage}
                onChangeText={props.onChangeText} />
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
    cardViewContainer: {
        borderRadius: 2,
        backgroundColor: "white",
        elevation: 2
    },
    input: {
        height: 45,
        marginLeft: 16,
        marginRight: 16,
        color: '#FFFFFF',
    }
})