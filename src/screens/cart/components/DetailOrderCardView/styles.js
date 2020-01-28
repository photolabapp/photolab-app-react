import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const width = 50
const height = 65

const styles = StyleSheet.create({
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
        backgroundColor: '#000000'
    },
    orderInfoContainer: {
        paddingStart: 24,
        paddingEnd: 24,
        marginBottom: 3,
        marginTop: 2,
        flexDirection: "row",
    },
    OrderInfoTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
    },
    orderInfoDesc: {
        flex: 1,
        fontSize: 14,
        textAlign: "right",
        color: "black"
    },
    orderInfoHeader: {
        paddingStart: 16,
        height: 40,
        backgroundColor: "#D2D2D2",
        color: "black",
        textAlignVertical: "center",
        textAlign: "left",
        fontWeight: "bold"
    }
})