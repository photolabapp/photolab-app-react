import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, FlatList, Text, Alert } from 'react-native'

export default styles = StyleSheet.create({
    containerScene: {
        paddingTop: 8,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageFlatList: {
        alignItems: "center",
        flexGrow: 1,
        margin: 4,
        padding: 1
    },
    info: {
        color: '#000',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    scene: {
        flex: 1,
        flexDirection: "column",
    },
    pickerTitle: {
        height: 40,
        fontSize: 12,
        marginEnd: 2,
        textAlign: "center",
        textAlignVertical: 'center',
        color: "#000"
    },
    picker: {
        height: 20,
        fontSize: 12,
        paddingEnd: 0,
        width: "100%",
        color: "#000",
    },
    pickerContainer: {
        marginBottom: 10,
        height: 40,
        width: 112,
        borderWidth: 2,
        borderColor: '#c2c2c1',
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#d2d2d2",
        justifyContent: "center",
        alignItems: "center",
    },
})