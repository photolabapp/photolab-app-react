import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native'
import Carousel from 'react-native-snap-carousel';


const entries = [
    {
        title: 'TESTE 1',
        subtitle: 'TESTE 1',
        uri: 'http://www.quintoandar.com.br/img/xxl/892954573-591.33623099889475andar13.jpg'
    },
    {
        title: 'TESTE 2',
        subtitle: 'TESTE 2',
        uri: 'http://www.quintoandar.com.br/img/xxl/892954573-329.9942198966845andar14.jpg'
    },
    {
        title: 'TESTE 3',
        subtitle: 'TESTE 4',
        uri: 'http://www.quintoandar.com.br/img/xxl/892954573-165.144933116816565andar18.jpg'
    },
    {
        title: 'TESTE 3',
        subtitle: 'TESTE 4',
        uri: 'http://www.quintoandar.com.br/img/xxl/892954573-165.144933116816565andar18.jpg'
    },
    {
        title: 'TESTE 3',
        subtitle: 'TESTE 4',
        uri: 'http://www.quintoandar.com.br/img/xxl/892954573-165.144933116816565andar18.jpg'
    },
    {
        title: 'TESTE 3',
        subtitle: 'TESTE 4',
        uri: 'http://www.quintoandar.com.br/img/xxl/892954573-165.144933116816565andar18.jpg'
    },
    {
        title: 'TESTE 3',
        subtitle: 'TESTE 4',
        uri: 'http://www.quintoandar.com.br/img/xxl/892954573-165.144933116816565andar18.jpg'
    }
]

export default class Album extends Component {
    constructor(props) {
        super(props)
    }

    screenWidth = Math.round(Dimensions.get('window').width);
    screenHeight = Math.round(Dimensions.get('window').height);

    renderItem = ({ item, index }) => {
        const { uri, title, content } = item;
        return (
            <ImageBackground
                style={{ width: this.screenWidth / 1.2, height: this.screenHeight / 2 }}
                source={{ uri: uri }} >
            </ImageBackground>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    data={entries}
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