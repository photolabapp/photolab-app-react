import React, { Component } from 'react'
import { Image } from 'react-native'

export default class LogoTitle extends Component {
    render() {
        return (
            <Image
                source={{ uri: 'https://www.photolab1.com.br/img/logo-topo.png' }}
                style={{ width: 30, height: 30 }} />
        );
    }
}