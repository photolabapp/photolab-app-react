import { name, dueDate } from '../../../utils/RegexUtil'
import { MaskService } from 'react-native-masked-text'

export default (creditCard) => {

    let error = {}

    if (creditCard.number === null || !MaskService.isValid('credit-card', creditCard.number)) {
        error.number = "Numero do cartão inválido"
    }

    if (!name.test(creditCard.cardHolder)) {
        error.cardHolder = "Nome inválido"
    }

    if (!MaskService.isValid('cpf', creditCard.cpf)) {
        error.cpf = "CPF inválido"
    }

    if (!dueDate.test(creditCard.dueDate)) {
        error.dueDate = "Data de validade inválido"
    }

    return error
}