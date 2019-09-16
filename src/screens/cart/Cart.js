import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-picker'


class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current: 1,
            total: 0,
            value: 20.0,
        }
    }

    render() {
        return (
            <View styles={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
    buttonText: {
        color: "white"
    },
    button: {
        height: 45,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 250,
        backgroundColor: "#00b5ec",
    }
})

const mapStateToProps = album => {
    return { album: album.album }
}

export default connect(mapStateToProps)(Cart)