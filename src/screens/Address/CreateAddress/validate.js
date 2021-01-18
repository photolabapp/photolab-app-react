import {cep, name} from '../../../utils/RegexUtil'

export default (address) => {
    
    let error = {}
    
    if (!cep.test(address.cep)) {
        error.cep = "Cep inválido"
    }

    if (!name.test(address.recipient)) {
        error.recipient = "Destinatário inválido"
    }

    if (address.address != null && address.address.length === 0) {
        error.address = "Endereço inválido"
    }

    if (address.neighborhood != null && address.neighborhood.length === 0) {
        error.neighborhood = "Bairro inválido"
    }

    if (address.number != null && address.number.length === 0) {
        error.number = "Numero inválido"
    }

    if (address.state != null && address.state.length === 0) {
        error.state = "Estado inválido"
    }

    if (address.city != null && address.city.length === 0) {
        error.city = "Cidade inválido"
    }

    //if (address.type != null && address.type.length === 0) {
    //    error.set("type", "Tipo inválido")
    //}

    return error
}