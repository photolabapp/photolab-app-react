import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#D2D2D2' }}
        style={{ backgroundColor: '#31383E' }}
    />
);

const PlabTabView = props => (
    <TabView renderTabBar={renderTabBar} />
);

export default PlabTabView
