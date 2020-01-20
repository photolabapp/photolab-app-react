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
        marginBottom: 24
    },
    shippingTitle: {
        paddingStart: 16,
        height: 40,
        backgroundColor: "#D2D2D2",
        color: "black",
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: "bold"
    },
    shippingDesc: {
        color: "black",
        paddingStart: 16,
        paddingTop: 2,
        paddingBottom: 2
    },
    buyInfo: {
        paddingStart: 24,
        paddingEnd: 24,
        marginBottom: 3,
        marginTop: 2,
        flexDirection: "row",
    },
    buyTitleText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    buyDescText: {
        flex: 1,
        fontSize: 14,
        textAlign: "right",
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