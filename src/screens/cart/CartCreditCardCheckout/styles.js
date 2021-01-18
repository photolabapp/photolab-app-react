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
        paddingEnd: 16,
        marginBottom: 8,
    },
    infoContainer: {
        flex: 1,
        paddingStart: 8,
        paddingEnd: 24,
        marginBottom: 3,
        marginTop: 2,
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: "row",
    },
    infoDesc: {
        fontSize: 14,
        textAlign: "left",
        color: "black"
    },
    infoIcon: {
        marginTop: 6,
        position: 'absolute', 
        right: 0
    },
    input: {
        fontSize: 14,
        color: "#787d82"
    },
    buttonContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: "absolute"
    }
})