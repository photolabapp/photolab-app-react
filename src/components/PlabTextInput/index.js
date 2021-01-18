import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { Input } from 'react-native-elements';

export default PlabTextInput = (props) => {
    const {
        maxLength,
        secureTextEntry,
        placeholder,
        keyboardType,
        errorMessage,
        onChangeText,
        loading,
        style,
        value
    } = props

    return (
        <Input
            inputStyle={[styles.input, { ...style }]}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            placeholderTextColor="#787d82"
            errorStyle={styles.errorStyle}
            value={value}
            rightIcon={
                <ActivityIndicator size="small" animating={(typeof loading === 'undefined') ? false : loading} />
            }
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            keyboardType={keyboardType}
            maxLength={maxLength}
            errorMessage={errorMessage}
            onChangeText={onChangeText} />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        color: '#FFFFFF',
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        borderColor: "#FFF"
    },
    containerStyle: {
        //flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        borderColor: "#787d82"
    },
    errorStyle: {
        color: 'red'
    }
})