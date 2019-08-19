import {name, email, cellPhone, password} from '../../utils/RegexUtil'

export default (user) => {
    
    let error = new Map()
    
    if (!name.test(user.name)) {
        error.set("name", "Nome inválido.")
    }

    if (!email.test(user.email)) {
        error.set("email", "E-mail inválido")
    }

    if (!cellPhone.test(user.cellPhone)){
        error.set("cellPhone", "Celular inválido")
    }

    if (!password.test(user.password)){
        error.set("password", "Senha inválido")
    }

    return error
}