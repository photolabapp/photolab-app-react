const name = new RegExp("/^[a-zA-Z0-9.]{5-20}")
const email = new RegExp("/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i")
const cellPhone = new RegExp("^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$")
const password = new RegExp("/^[a-zA-Z0-9.]{8-20}")

const validate = (user) => {
    
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
        error.set("cellPhone", "Senha inválido")
    }

    return error
}

export default validate