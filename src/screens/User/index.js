import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Dimensions } from 'react-native';
import { PlabCardView, PlabButton } from '../components'
import styles from './styles'

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

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(User)