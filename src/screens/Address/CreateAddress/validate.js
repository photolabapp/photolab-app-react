import {cep, name} from '../../utils/RegexUtil'

export default (address) => {
    
    let error = new Map()
    
    if (!cep.test(address.cep)) {
        error.set("cep", "Cep inválido.")
    }

    if (!name.test(address.recipient)) {
        error.set("recipient", "Destinatário inválido")
    }

    if (address.address != null && address.address.length === 0) {
        error.set("address", "Endereço inválido")
    }

    if (address.number != null && address.number.length === 0) {
        error.set("number", "Numero inválido")
    }

    if (address.state != null && address.state.length === 0) {
        error.set("state", "Estado inválido")
    }

    if (address.city != null && address.city.length === 0) {
        error.set("city", "Cidade inválido")
    }

    if (address.type != null && address.type.length === 0) {
        error.set("type", "Tipo inválido")
    }

    return error
}