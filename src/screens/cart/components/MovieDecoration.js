import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export const MovieDecoration = () => {
    return (
        <View style={styles.boxBlack} >
            <View style={styles.boxWhite} />
            <View style={styles.boxWhite} />
            <View style={styles.boxWhite} />
        </View>
    )
}

const styles = StyleSheet.create({
    boxWhite: {
        backgroundColor: 'white',
        height: 6,
        width: 10
    },
    boxBlack: {
        flexDirection: "row",
        padding: 2,
        width: 50,
        height: 10,
        backgroundColor: 'black',
        justifyContent: 'space-between'
    }
})


