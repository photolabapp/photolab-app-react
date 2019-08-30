import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native'
import Carousel from 'react-native-snap-carousel';

class Album extends Component {
    constructor(props) {
        super(props)

        console.log("pqpqqppqpq" + props.album.album)
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);

    renderItem = ({ item, index }) => {
        const { uri } = item;
        //console.log("pqpqqppqpq uri " + uri)
        return (
            <View>
                <ImageBackground
                    style={{ width: this.screenWidth / 1.2, height: this.screenHeight / 2 }}
                    source={{ uri: uri }} >
                </ImageBackground>
                <Text style={{ color: "#000" }}>{index}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    data={this.props.album.album}
                    itemWidth={this.screenWidth / 1.2}
                    sliderWidth={this.screenWidth / 1.1}
                    itemHeight={this.screenHeight / 2}
                    renderItem={this.renderItem} />

                <Text>TESTE 2</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D2D2'
    },
})

const mapsStateToProps = ({ album }) => {
    console.log("sdsdsdsd " + album.album[0].uri)
    return {
        album: album
    }
}

//export default connect(mapsStateToProps)(Album)
export default connect(album => ({ album: album.album }))(Album)