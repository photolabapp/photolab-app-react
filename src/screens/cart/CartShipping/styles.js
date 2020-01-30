import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
        flex: 1,
        fontSize: 14,
        textAlign: "left",
        color: "black"
    },
    buttonContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        //top: (screenHeight - 73) - 50,
        position: "absolute"
    },
    buttonAddAddressContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        //top: (screenHeight - 73) - 120,
        position: "absolute"
    }
})

export default styles