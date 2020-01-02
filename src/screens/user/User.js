import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PlabCardView, PlabButton } from '~/components'

class User extends Component {

    constructor(props) {
        super(props);
    }

    resetPassword = () => {

    }

    render() {
        return (
            <View styles={styles.container}>

                <PlabCardView style={styles.cardViewContainer}>
                    <Text style={styles.cardHeader}>Dados do usuário</Text>

                    <View style={styles.containerInfo}>
                        <Text style={styles.textTitle}>Nome:</Text>
                        <Text style={styles.textDesc}>{this.props.user.name}</Text>
                    </View>

                    <View style={styles.containerInfo}>
                        <Text style={styles.textTitle}>E-mail:</Text>
                        <Text style={styles.textDesc}>{this.props.user.email}</Text>
                    </View>

                    <View style={styles.containerInfo}>
                        <Text style={styles.textTitle}>Telefone:</Text>
                        <Text style={styles.textDesc}>{this.props.user.cellPhone}</Text>
                    </View>

                    <View style={styles.containerInfo}>
                        <Text style={styles.textTitle}>Data do cadastro:</Text>
                        <Text style={styles.textDesc}>{this.props.user.dtCreated}</Text>
                    </View>

                    <PlabButton
                        style={{ marginTop: 16, marginBottom: 8, width: "90%" }}
                        text="Alterar senha"
                        onPress={() => this.resetPassword()} />

                </PlabCardView>
            </View>
        )
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

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(User)