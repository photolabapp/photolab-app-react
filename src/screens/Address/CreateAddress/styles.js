import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginStart: 24,
        marginEnd: 24,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    input: {
        fontSize: 14,
        color: "#787d82"
    },
    pickerContainer: {
        marginBottom: 16,
        height: 50,
        //paddingBottom: 12,
        //flex: 1,
        //flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#787d82',
    },
    picker: {
        fontSize: 12,
        width: "100%",
        color: "#787d82",
    },
    button: {

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    splitContainer: {
        height: 62,
        flexDirection: 'row'
    },
    inputNumber: {
        //width: '20%',
        fontSize: 14
    },
    inputComplement: {
        //width: '80%',
        fontSize: 14
    },
    inputCity: {

    },
    pickerState: {

    }
})