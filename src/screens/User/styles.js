import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    header: {
        height: 55,
        backgroundColor: "#D2D2D2",
        justifyContent: "center",
        alignItems: "center"
    },
    headerTitle: {
        flex: 1,
        flexDirection: "column",
        color: "black",
        fontSize: 18,
        textAlignVertical: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
    cardViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 16,
        marginEnd: 16,
        marginTop: 24
    },
    containerInfo: {
        paddingStart: 24,
        paddingEnd: 24,
        marginBottom: 0,
        marginTop: 8,
        flexDirection: "row",
    },
    textTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    textDesc: {
        flex: 1,
        fontSize: 14,
        textAlign: "right",
        color: "black"
    },
    cardHeader: {
        width: "100%",
        paddingStart: 16,
        height: 40,
        backgroundColor: "#D2D2D2",
        color: "black",
        textAlignVertical: "center",
        textAlign: "left",
        fontWeight: "bold"
    }
})