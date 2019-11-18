import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { CardView, Button } from '../../components/UIKit'

class User extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        <View styles={styles.container}>

            <CardView style={{ marginStart: 16, marginEnd: 16, marginTop: 24 }}>
                <Text style={styles.cardHeader}>Dados do usuário</Text>

                <View style={styles.containerInfo}>
                    <Text style={styles.buyTitleText}>Nome:</Text>
                    <Text style={styles.buyDescText}>{this.props.user.name}</Text>
                </View>

                <View style={styles.containerInfo}>
                    <Text style={styles.buyTitleText}>E-mail:</Text>
                    <Text style={styles.buyDescText}>{this.props.user.email}</Text>
                </View>

                <View style={styles.containerInfo}>
                    <Text style={styles.buyTitleText}>Telefone:</Text>
                    <Text style={styles.buyDescText}>R$ {this.props.user.cellPhone}</Text>
                </View>

                <View style={styles.containerInfo}>
                    <Text style={styles.buyTitleText}>Data do cadastro:</Text>
                    <Text style={styles.buyDescText}>{this.props.user.dtCreated}</Text>
                </View>

                <Button
                    style={{ width: "100%", top: 40 }}
                    text="Alterar senha"
                    onPress={() => this.save()} />
            </CardView>


        </View>
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

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
        backgroundColor: '#D2D2D2'
    },
    containerInfo: {
        paddingStart: 24,
        paddingEnd: 24,
        marginBottom: 3,
        marginTop: 2,
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
        paddingStart: 16,
        height: 40,
        backgroundColor: "#D2D2D2",
        color: "black",
        textAlignVertical: "center",
        textAlign: "left",
        fontWeight: "bold"
    }
})

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(User)