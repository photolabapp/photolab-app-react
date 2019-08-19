import {email, password} from '../../utils/RegexUtil'

export default (user) => {
    
    let error = new Map()
    
    if (!email.test(user.email)) {
        error.set("email", "E-mail inválido")
    }

    if (!password.test(user.password)) {
        error.set("password", "Senha inválida")
    }

    return error
}