import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
    buttonContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: (screenHeight - 73) - 50,
        position: "absolute"
    },
    buttonAddAddressContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: (screenHeight - 73) - 120,
        position: "absolute"
    },
    cardViewContainer: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        paddingBottom: 4,
        backgroundColor: "white",
        elevation: 2
    },
})

export default styles