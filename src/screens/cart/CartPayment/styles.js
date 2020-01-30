import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2',
        marginEnd: 24
    },
    cardViewContainer: {
        marginStart: 16,
        marginEnd: 16,
        marginBottom: 8,
    },
    infoContainer: {
        paddingStart: 8,
        paddingEnd: 24,
        marginBottom: 3,
        marginTop: 2,
        flexDirection: "row",
    },
    infoDesc: {
        fontSize: 14,
        textAlign: "left",
        color: "black"
    },
    infoIcon: {
        textAlign: "right",
    },
    buttonContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: "absolute"
    },
    buttonAddPaymentContainer: {
        color: '#000', 
        fontSize: 14, 
        marginStart: 16, 
        paddingTop: 8, 
        paddingBottom: 8, 
        marginBottom: 50, 
        textAlign: "center"
    }
})