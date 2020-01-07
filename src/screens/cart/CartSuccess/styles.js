import { StyleSheet } from 'react-native'
import Colors from '../../../utils/Colors'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
    text: {
        marginStart: 16,
        marginEnd: 16,
        textAlignVertical: "center",
        textAlign: "center"
    },
    textBold: {
        color: "black",
        fontWeight: "bold"
    },
    textNormal: {
        color: "black",
    },
    textOrange: {
        color: Colors.orange,
        fontSize: 24,
        fontWeight: "bold"
    },
    cardViewHeader: {
        paddingStart: 16,
        height: 40,
        backgroundColor: "#D2D2D2",
        color: "black",
        textAlignVertical: "center",
        textAlign: "left",
        fontWeight: "bold"
    },
})
